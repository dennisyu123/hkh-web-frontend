'use client';

import { motion, useReducedMotion } from 'framer-motion';

import type { RoadmapMilestone } from '../lib/data/roadmap';

const statusStyles: Record<RoadmapMilestone['status'], string> = {
  planned: 'border-amber-200 bg-amber-50 text-amber-700',
  'in-progress': 'border-sky-200 bg-sky-50 text-sky-700',
  completed: 'border-emerald-200 bg-emerald-50 text-emerald-700'
};

type RoadmapTimelineProps = {
  milestones: RoadmapMilestone[];
};

export default function RoadmapTimeline({ milestones }: RoadmapTimelineProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full">
      <div className="relative mx-auto flex max-w-5xl flex-col gap-8 md:gap-10">
        <div className="absolute left-4 top-0 h-full w-px bg-slate-200 md:left-1/2" />

        {milestones.map((milestone, index) => {
          const isEven = index % 2 === 0;
          const animationDelay = reduceMotion ? 0 : index * 0.08;

          return (
            <motion.article
              key={milestone.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: animationDelay, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.4 }}
              className={`relative flex flex-col gap-4 md:gap-6 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {milestone.quarter}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      statusStyles[milestone.status]
                    }`}
                  >
                    {milestone.status.replace('-', ' ')}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">{milestone.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{milestone.summary}</p>
                </div>

                <ul className="grid gap-2 text-sm text-slate-600">
                  {milestone.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" aria-hidden />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative flex w-8 items-start justify-center md:w-16">
                <span className="absolute left-3 top-6 h-3 w-3 rounded-full border border-slate-300 bg-white md:left-1/2 md:-translate-x-1/2" />
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
