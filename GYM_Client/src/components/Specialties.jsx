import React from 'react';
import * as LucideIcons from 'lucide-react';
import useFetchData from '../hooks/useFetchData';

export default function Specialties() {
  const { data: dbHeading } = useFetchData('specialties_heading/active', []);
  const { data: dbSpecialties } = useFetchData('specialties/active', []);

  const heading = dbHeading && dbHeading.length > 0 ? dbHeading[0] : {
    tag: "Specialties",
    title: "What I Do",
    desc: "Tailored coaching programs designed for your specific objectives."
  };

  const specialties = dbSpecialties && dbSpecialties.length > 0 ? dbSpecialties : [
    { num: '01', icon: 'Dumbbell', title: 'Strength & Hypertrophy', desc: 'Progressive overload programming using powerlifting, bodybuilding, and hybrid methodologies. Build real, functional muscle that performs as good as it looks.', tags: ['Powerlifting', 'Bodybuilding', 'Periodisation'] },
    { num: '02', icon: 'Flame', title: 'Fat Loss & Recomposition', desc: 'Science-based body recomposition protocols: strategic calorie management, metabolic conditioning, and body composition tracking — no crash diets.', tags: ['Recomp', 'DEXA Tracking', 'Nutrition'] },
    { num: '03', icon: 'Zap', title: 'Athletic Performance', desc: 'Speed, power, agility, and sport-specific conditioning. Trusted by competitive athletes in football, MMA, basketball, and track & field.', tags: ['Speed', 'Power', 'Agility'] },
    { num: '04', icon: 'Utensils', title: 'Nutrition Coaching', desc: 'Macro programming, meal timing, and sustainable dietary habits. No rigid meal plans — flexible dieting frameworks that fit your lifestyle.', tags: ['Macros', 'Flexible Dieting', 'Habits'] },
    { num: '05', icon: 'Activity', title: 'Mobility & Injury Prevention', desc: 'FMS-based movement screening and corrective exercise protocols. Move better, train harder, and stay injury-free long-term.', tags: ['FMS', 'Corrective', 'Flexibility'] },
    { num: '06', icon: 'Laptop', title: 'Online Coaching', desc: 'Full-service remote coaching via a dedicated app — custom programs, weekly check-ins, video form reviews, and 24/7 messaging support.', tags: ['App-Based', 'Video Reviews', '24/7 Support'] }
  ];

  return (
    <section className="specialties" id="specialties">
      <div className="container">
        <div className="reveal" style={{ maxWidth: '700px', marginBottom: '3.5rem' }}>
          <div className="section-label">{heading.tag}</div>
          <h2 className="section-title">{heading.title}</h2>
          <p className="section-desc">{heading.desc}</p>
        </div>
        <div className="spec-grid reveal">
          {specialties.map((spec, idx) => {
            const IconComponent = LucideIcons[spec.icon] || LucideIcons.Dumbbell;
            const tags = Array.isArray(spec.tags) ? spec.tags : [];
            return (
              <div className="spec-card" key={spec.num || idx}>
                <div className="spec-num">{spec.num}</div>
                <div className="spec-icon" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--accent)' }}>
                  <IconComponent size={28} />
                </div>
                <h3>{spec.title}</h3>
                <p>{spec.desc}</p>
                <div className="spec-tags">
                  {tags.map((tag, tagIdx) => (
                    <span className="spec-tag" key={tagIdx}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
