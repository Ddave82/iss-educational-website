// Curated explanations; only surface an experiment when a recent NASA station
// report actually names it. No inference that a mentioned experiment is live.
export const experiments = [
  { id: "e4d", pattern: /\bE4D\b|European Enhanced Exploration Exercise Device/i, title: "E4D", category: { de: "Gesundheit", en: "Health", da: "Sundhed" },
    de: { title: "Fit bleiben auf langen Missionen", about: "Die Crew erprobt ein kompaktes Trainingsgerät für künftige Raumflüge.", why: "Ohne die übliche Belastung durch Schwerkraft bauen Muskeln und Knochen ab.", benefit: "Besseres Training für Reisen zum Mond und Mars." },
    en: { title: "Staying fit on long missions", about: "The crew tests a compact exercise device for future spaceflight.", why: "Without the usual load from gravity, muscles and bones weaken.", benefit: "Better exercise for journeys to the Moon and Mars." },
    da: { title: "I form på lange missioner", about: "Besætningen afprøver et kompakt træningsapparat til fremtidige rumrejser.", why: "Uden normal tyngdebelastning svækkes muskler og knogler.", benefit: "Bedre træning på rejser til Månen og Mars." } },
  { id: "venous", pattern: /\bVenous Flow\b/i, title: "Venous Flow", category: { de: "Medizin", en: "Medicine", da: "Medicin" },
    de: { title: "Blutfluss in Schwerelosigkeit", about: "Ultraschall und Blutdruckmessungen untersuchen den venösen Blutfluss der Crew.", why: "In Schwerelosigkeit verteilen sich Körperflüssigkeiten anders als auf der Erde.", benefit: "Risiken für Blutgerinnsel besser verstehen und die Crew schützen." },
    en: { title: "Blood flow in microgravity", about: "Ultrasound and blood pressure measurements examine the crew’s venous blood flow.", why: "Body fluids redistribute in microgravity.", benefit: "Understand blood clot risks and protect astronauts." },
    da: { title: "Blodets vej i mikrogravitation", about: "Ultralyd og blodtryksmålinger undersøger besætningens venøse blodstrøm.", why: "Kropsvæsker fordeler sig anderledes i mikrogravitation.", benefit: "Forstå risikoen for blodpropper og beskyt astronauter." } },
  { id: "ared", pattern: /\bARED\s+(?:\([^)]*\)\s*)?Kinematics\b/i, title: "ARED Kinematics", category: { de: "Bewegung", en: "Movement", da: "Bevægelse" },
    de: { title: "Training unter der Lupe", about: "Messungen erfassen Bewegungen und Körperbelastung beim Krafttraining auf der ISS.", why: "Trainingskräfte müssen im freien Fall gezielt erzeugt werden.", benefit: "Übungen für den Erhalt von Muskeln und Knochen verbessern." },
    en: { title: "A closer look at exercise", about: "Measurements track movement and body loading during resistance exercise on the ISS.", why: "Exercise loads must be deliberately created in free fall.", benefit: "Improve exercise to preserve muscle and bone." },
    da: { title: "Træning under lup", about: "Målinger registrerer bevægelse og belastning under styrketræning på ISS.", why: "Træningsbelastning skal skabes målrettet i frit fald.", benefit: "Forbedre øvelser, der bevarer muskler og knogler." } },
  { id: "miyoka", pattern: /\bMIYOKA\b/i, title: "MIYOKA", category: { de: "Technik", en: "Technology", da: "Teknologi" },
    de: { title: "Elektronik im Orbit reparieren", about: "Die Crew untersucht das sichere Löten und Reparieren von Elektronik in Schwerelosigkeit.", why: "Flüssiges Lot verhält sich ohne Schwerkraft anders.", benefit: "Lange Missionen unabhängiger von Ersatzteilen von der Erde machen." },
    en: { title: "Repairing electronics in orbit", about: "The crew investigates safe soldering and repair of electronics in microgravity.", why: "Liquid solder behaves differently without gravity.", benefit: "Make long missions less dependent on spare parts from Earth." },
    da: { title: "Reparation af elektronik i kredsløb", about: "Besætningen undersøger sikker lodning og reparation af elektronik i mikrogravitation.", why: "Flydende loddemetal opfører sig anderledes uden tyngdekraft.", benefit: "Gør lange missioner mindre afhængige af reservedele fra Jorden." } }
];

export function recentExperiments(reports = []) {
  return experiments.map(experiment => ({ ...experiment, report: reports.find(report => report.experimentIds?.includes(experiment.id)) }))
    .filter(item => item.report).sort((a, b) => Date.parse(b.report.publishedAt) - Date.parse(a.report.publishedAt)).slice(0, 3);
}
