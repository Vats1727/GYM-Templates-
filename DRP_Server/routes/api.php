<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

require_once __DIR__ . '/../helpers/FileHelper.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../config/database.php';

class Router {
    private $routes = [];
    public function add($method, $path, $callback) {
        $this->routes[] = ['method' => $method, 'path' => $path, 'callback' => $callback];
    }
    public function get($path, $callback) { $this->add('GET', $path, $callback); }
    public function post($path, $callback) { $this->add('POST', $path, $callback); }
    public function put($path, $callback) { $this->add('PUT', $path, $callback); }
    public function delete($path, $callback) { $this->add('DELETE', $path, $callback); }

    public function resolve() {
        // Automatically process file uploads from $_FILES and merge into $_POST
        if (!empty($_FILES)) {
            foreach ($_FILES as $key => $file) {
                if (isset($file['error']) && $file['error'] === UPLOAD_ERR_OK) {
                    $uploadedPath = FileHelper::upload($file, 'images', $key);
                    if ($uploadedPath) {
                        $_POST[$key] = $uploadedPath;
                    }
                }
            }
        }

        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        
        // ROBUST SUBDIR DETECTION
        $baseMarkers = ['/server/public', '/public'];
        foreach ($baseMarkers as $marker) {
            $pos = strpos($uri, $marker);
            if ($pos !== false) {
                $uri = substr($uri, $pos + strlen($marker));
                break;
            }
        }
        
        $uri = str_replace('/index.php', '', $uri);
        if (empty($uri)) $uri = '/';
        if ($uri !== '/' && substr($uri, -1) === '/') $uri = rtrim($uri, '/');
        
        // Globally repair frontend path mismatch by prepending /api if missing (excluding auth paths)
        if ($uri !== '/' && strpos($uri, '/api/') !== 0 && strpos($uri, '/auth/') !== 0) {
            // Add leading slash if missing
            $cleanUri = '/' . ltrim($uri, '/');
            if (strpos($cleanUri, '/api/') !== 0 && strpos($cleanUri, '/auth/') !== 0) {
                $uri = '/api' . $cleanUri;
            }
        }

        // Rewrite simple public GET endpoints to their active counterparts if they don't already have it
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method === 'GET') {
            $activeRewrites = [
                '/api/navbar' => '/api/navbar/active',
                '/api/hero_section' => '/api/hero_section/active',
                '/api/about_section' => '/api/about_section/active',
                '/api/treatments' => '/api/treatments/active',
                '/api/case_studies' => '/api/case_studies/active',
                '/api/reviews' => '/api/reviews/active',
                '/api/process_steps' => '/api/process_steps/active',
                '/api/footer' => '/api/footer/active',
                '/api/bookings' => '/api/bookings/active',
                '/api/treatments_heading' => '/api/treatments_heading/active',
                '/api/case_studies_heading' => '/api/case_studies_heading/active',
                '/api/reviews_heading' => '/api/reviews_heading/active',
                '/api/process_steps_heading' => '/api/process_steps_heading/active'
            ];
            if (isset($activeRewrites[$uri])) {
                $uri = $activeRewrites[$uri];
            }
        }
        // FormData PUT override support
        if ($method === 'POST' && isset($_POST['_method'])) {
            $method = strtoupper($_POST['_method']);
        }
        
        foreach ($this->routes as $route) {
            $pattern = "#^" . preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<$1>[^/]+)', $route['path']) . "$#";
            if ($method === $route['method'] && preg_match($pattern, $uri, $matches)) {
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                return call_user_func_array($route['callback'], array_values($params));
            }
        }
        http_response_code(404);
        echo json_encode(['error' => 'Not Found', 'uri' => $uri]);
    }
}

$router = new Router();

// --- AUTO-GENERATED AUTH (DO NOT REMOVE) ---
require_once __DIR__ . '/../controllers/AuthController.php';
$authCtrl = new AuthController();
$router->post('/auth/login', [$authCtrl, 'login']);
$router->post('/auth/forgot-password', [$authCtrl, 'forgotPassword']);
$router->post('/auth/verify-otp', [$authCtrl, 'verifyOtp']);
$router->get('/auth/check', [$authCtrl, 'check']);
// --- AUTO-GENERATED AUTH ---

// AUTO-LOAD GENERATED ROUTES
foreach (glob(__DIR__ . '/*Routes.php') as $filename) {
    require_once $filename;
}

$router->resolve();
