# ⭐ 🩺 Razonamiento Clínico — 2026-06-13

> Marca con `[x]` los papers/unidades que quieras **estrellar**. Aparecen en la página Favoritos de la galería.
> Galería: https://jaflomd.github.io/jaflo-daily-intel/ · Favoritos: https://jaflomd.github.io/jaflo-daily-intel/favoritos.html
> Dossier: https://jaflomd.github.io/jaflo-daily-intel/dossiers/clinical-reasoning/2026-06-13.html

## 🏆 Top 3
- [ ] **Multimodal foundation models exploit text to make medical image predictions** — _Nature Communications · 12 jun 2026 (Buckley, Diao, Rodman, Rajpurkar, Manrai — Harvard/Beth Israel) · paper_ — [doi.org/10.1038/s41467-026-74207-5](https://doi.org/10.1038/s41467-026-74207-5) <!--star:clinical-reasoning|2026-06-13|t3-1-->
  > Jaflo, este es el paper del día: en 1090 casos multimodales, los modelos fundacionales 'leen' la imagen casi enteramente a través del texto, y basta una viñeta clínica engañosa para que o3 se desplome de 84% a 28% de exactitud — y agregar la imagen a un texto muy informativo a veces EMPEORA el desempeño (GPT-4V cayó en 69 conferencias clinicopatológicas). Te importa porque es el cierre prematuro y el anclaje que enseñas a evitar en humanos, ahora demostrado en máquinas: la IA hereda nuestros sesgos cognitivos por la puerta del prompt. Es munición directa para tu pilar ai-enhancement y para el capítulo de razonamiento dual del BMSE — el 'razonamiento' de un LLM es tan frágil al anclaje como el de un R1. Úsalo como pieza ancla: un carrusel/Reel 'La IA también hace cierre prematuro' y, en AMAUTA, como demo de por qué hay que dar el contexto sin sesgar la respuesta.
- [ ] **Reasoning or reciting? A temporal contamination audit of large language models in clinical medicine** — _Journal of the American Medical Informatics Association (JAMIA) · 11 jun 2026 · paper_ — [doi.org/10.1093/jamia/ocag069](https://doi.org/10.1093/jamia/ocag069) <!--star:clinical-reasoning|2026-06-13|t3-2-->
  > Jaflo, el contrapunto perfecto al #1: auditaron 2000 case reports — 1000 dentro del training (2021-2022) y 1000 post-cutoff (2025) — y la exactitud diagnóstica fue idéntica (66.8% 'contaminados' vs 66.9% 'limpios'), con similitud léxica y semántica planas, refutando la hipótesis de memorización con 10 000 evaluaciones validadas contra consenso médico. Te importa porque zanja con DATA el debate 'loro estocástico vs razonador genuino' que aparece en cada charla tuya sobre IA en educación, y porque el diseño es trasladable: es exactamente la métrica que te falta para distinguir 'recitar' de 'razonar' en un banco ENAM. Léelo en par dialéctico con el Nature Comms — uno dice que el razonamiento de la IA es frágil al texto, el otro que es genuino y no memorizado — y tienes el esqueleto de una charla o de un editorial sobre qué significa 'razonar' en 2026.
- [ ] **Musculoskeletal surgeons use mixed reasoning rather than pure Bayesian strategies in clinical practice** — _PLoS ONE · 12 jun 2026 (Parisien, Ring et al. — Science of Variation Group) · paper_ — [doi.org/10.1371/journal.pone.0351694](https://doi.org/10.1371/journal.pone.0351694) <!--star:clinical-reasoning|2026-06-13|t3-3-->
  > Jaflo, evidencia empírica pura de razonamiento humano: 153 cirujanos respondieron 8 escenarios de test/tratamiento y el puntaje bayesiano promedio fue 3.0/4 — solo 29% de respuestas plenamente bayesianas, 8.6% completamente no-bayesianas, y un 42% usó razonamiento no-bayesiano al menos una vez. El dato fino es el Cronbach alfa de 0.43: el razonamiento bayesiano NO es un constructo único, es un set de habilidades context-dependent. Te importa porque desarma el supuesto de que 'enseñar probabilidad' en abstracto basta — implica enseñar por escenario, justo el tipo de granularidad que tu BMSE/razonamiento dimensional y el Competency Lab de AMAUTA pueden operacionalizar. Úsalo como justificación metodológica para un módulo de razonamiento probabilístico por casos, y como semilla de un paper análogo con médicos peruanos en formación ENAM/residentado.

## 📡 Radar (10)
- [ ] **Exploring the use of AI-generated counterfactual chest X-rays to enhance diagnostic learning in medical education** — _BMC Medical Education · 12 jun 2026 · paper_ — [doi.org/10.1186/s12909-026-09597-7](https://doi.org/10.1186/s12909-026-09597-7) <!--star:clinical-reasoning|2026-06-13|t10-1-->
  > Radiografías 'contrafácticas' generadas por IA (misma anatomía, condición distinta) mejoraron exactitud y calibración de confianza en 42 médicos/estudiantes — y revelaron debilidades diagnósticas invisibles a la enseñanza tradicional.
  > 🔮 Predicción Fable: el 'what-if' contrafáctico sobre el mismo paciente será una mecánica central de tu Competency Lab; arma un piloto con casos peruanos antes de que se vuelva producto comercial cerrado.
- [ ] **Reproducibility of AI-Generated Antibiotic Recommendations in Standardized Clinical Scenarios: A Proof-of-Concept Experimental Study** — _International Journal of Antimicrobial Agents · 12 jun 2026 · paper_ — [doi.org/10.1016/j.ijantimicag.2026.107881](https://doi.org/10.1016/j.ijantimicag.2026.107881) <!--star:clinical-reasoning|2026-06-13|t10-2-->
  > 2400 interacciones: ChatGPT-5.2 era más consistente (acuerdo total en 5/12 casos) pero menos correcto que OpenEvidence (35.7% vs 54.8%) — la reproducibilidad NO se alinea con la corrección clínica.
  > 🔮 Predicción Fable: 'reproducibilidad' se volverá un criterio de gate junto a accuracy para CDSS-LLM; proponlo como eje en tu marco de IA para educación médica de precisión antes que nadie lo formalice.
- [ ] **Impact of SNAPPS-based teaching on diagnostic accuracy and academic achievement in pathology residents** — _BMC Medical Education · 11 jun 2026 · paper_ — [doi.org/10.1186/s12909-026-09668-9](https://doi.org/10.1186/s12909-026-09668-9) <!--star:clinical-reasoning|2026-06-13|t10-3-->
  > El modelo SNAPPS (Summarize-Narrow-Analyze-Probe-Plan-Self-directed) mejoró razonamiento diagnóstico y notas de MCQ en residentes de patología, con el mayor efecto en R3.
  > 🔮 Predicción Fable: SNAPPS es un andamiaje listo para empaquetar en AMAUTA como protocolo de presentación de casos; convéncelo en un Reel de 'cómo presentar un caso en 6 pasos' y mídelo en tu cohorte ENAM.
- [ ] **Nurses' Clinical Decision-Making During PICC Dressing Application and Removal: A Qualitative Study** — _Seminars in Oncology Nursing · 12 jun 2026 · paper_ — [doi.org/10.1016/j.soncn.2026.152259](https://doi.org/10.1016/j.soncn.2026.152259) <!--star:clinical-reasoning|2026-06-13|t10-4-->
  > Think-aloud mapeado a Teoría de Doble Proceso: el Sistema 1 (rutina, cultura de servicio) y el Sistema 2 (deliberación ante piel frágil/preferencias) coexisten en decisiones aparentemente triviales.
  > 🔮 Predicción Fable: el think-aloud + dual-process es un método barato y replicable para tu línea de razonamiento; úsalo como diseño plantilla para estudiar cómo razonan tus residentes en tareas 'automáticas'.
- [ ] **Validation of Artificial Intelligence in Detecting Acute Cervical Spine Fractures on CT** — _AJNR American Journal of Neuroradiology · 12 jun 2026 · paper_ — [doi.org/10.3174/ajnr.A9473](https://doi.org/10.3174/ajnr.A9473) <!--star:clinical-reasoning|2026-06-13|t10-5-->
  > En 2652 TC, los radiólogos superaron a la IA (Aidoc) en sensibilidad+especificidad combinadas (p=0.02); los falsos positivos venían de calcificaciones, fracturas crónicas y artefactos.
  > 🔮 Predicción Fable: el péndulo 'IA > humano' se está corrigiendo con validaciones honestas; guarda este como contrapeso en tu charla de IA — no para frenar adopción, sino para enseñar lectura crítica de claims.
- [ ] **Performance of GPT-based large language models in hepatocellular carcinoma stratification: liver function, BCLC staging, and treatment recommendations** — _Scientific Reports · 12 jun 2026 · paper_ — [doi.org/10.1038/s41598-026-56992-7](https://doi.org/10.1038/s41598-026-56992-7) <!--star:clinical-reasoning|2026-06-13|t10-6-->
  > Los modelos 'de razonamiento' (o1, o3) ganaron en tratamiento (hasta 90.6%) y en 9-14% de casos fueron MÁS guideline-concordantes que el tumor board — pero con tasa de error no despreciable.
  > 🔮 Predicción Fable: la brecha entre modelos conversacionales y 'de razonamiento' (o-series) es la mejor analogía viva de Sistema 1 vs Sistema 2 — material directo para tu capítulo dual-process del BMSE.
- [ ] **Bridging the outcome documentation gap in epilepsy surgery: Validating LLM agents for automated Engel and ILAE scoring from clinical notes** — _Epilepsia · 12 jun 2026 · paper_ — [doi.org/10.1002/epi.70341](https://doi.org/10.1002/epi.70341) <!--star:clinical-reasoning|2026-06-13|t10-7-->
  > Un prompt 'context-aware' con lógica temporal/causal llevó al LLM de 56.5% a 94.7% de concordancia en scoring de outcomes — el desempeño no vino del modelo sino de la ESTRUCTURA de razonamiento inyectada.
  > 🔮 Predicción Fable: 'el prompt es el razonamiento' será el insight transferible del año; tu ventaja es saber qué estructura clínica inyectar — empaquétalo como skill de prompting clínico para AMAUTA.
- [ ] **The role of metacognitive skills in anatomy education: a narrative review** — _Surgical and Radiologic Anatomy · 9 jun 2026 · review_ — [doi.org/10.1007/s00276-026-03919-6](https://doi.org/10.1007/s00276-026-03919-6) <!--star:clinical-reasoning|2026-06-13|t10-8-->
  > El conocimiento metacognitivo se gana fácil, pero las conductas autorregulatorias requieren scaffolding sostenido, no sesiones aisladas — y funcionan mejor integradas al curso.
  > 🔮 Predicción Fable: la metacognición 'one-shot' no transfiere; diseña el Competency Lab como práctica recurrente embebida, no como taller suelto, y tendrás ventaja sobre el mercado de cursos express.
- [ ] **Performance of large language models in interpreting evidence-based clinical guidelines for lumbar disc herniation with radiculopathy** — _European Spine Journal · 12 jun 2026 · paper_ — [doi.org/10.1007/s00586-026-10069-1](https://doi.org/10.1007/s00586-026-10069-1) <!--star:clinical-reasoning|2026-06-13|t10-9-->
  > Perplexity (grounded en referencias) fue más exacto y con la MENOR alucinación de referencias; ChatGPT-5.1 tuvo la mayor — el grounding, no el tamaño, predijo fiabilidad.
  > 🔮 Predicción Fable: para educación, los modelos reference-grounded ganarán adopción clínica; enséñale a tus alumnos a exigir fuentes verificables al LLM como parte del razonamiento, no como extra.
- [ ] **Gray-zone decisions in subclinical hypothyroidism: a qualitative analysis of ChatGPT responses** — _BMC Endocrine Disorders · 11 jun 2026 · paper_ — [doi.org/10.1186/s12902-026-02356-1](https://doi.org/10.1186/s12902-026-02356-1) <!--star:clinical-reasoning|2026-06-13|t10-10-->
  > Ante la zona gris (TSH 4-10), ChatGPT no da una respuesta sino tres perfiles de decisión (conservador guideline-based, proactivo por riesgo, shared-decision) — espeja la variabilidad humana ante la incertidumbre.
  > 🔮 Predicción Fable: el análisis cualitativo de CÓMO razona el LLM (no solo si acierta) es un nicho de paper poco explotado; replícalo en un escenario psiquiátrico dimensional y tienes ángulo propio.

---

## 💎 Perlas del día
- El cierre prematuro ya no es solo humano: o3 cayó de 84% a 28% de exactitud cuando una viñeta engañosa lo ancló — la IA hereda nuestros sesgos por la puerta del prompt (Nature Communications).
- Reproducibilidad ≠ corrección: ChatGPT-5.2 repetía la misma recomendación antibiótica en 5/12 casos pero acertaba menos que OpenEvidence (35.7% vs 54.8%) — consistencia confiada puede ser error confiado.
- La memorización no explica el desempeño clínico de los LLM: 66.8% en casos vistos vs 66.9% en casos post-cutoff — el debate 'loro vs razonador' por fin tiene data, no opinión (JAMIA).
- Los cirujanos no son bayesianos puros: solo 29% de respuestas plenamente bayesianas y 42% no-bayesianas al menos una vez; con Cronbach 0.43, el razonamiento probabilístico es context-dependent y entrenable, no un rasgo fijo.
- En la IA clínica, el prompt ES el razonamiento: inyectar lógica temporal/causal subió la concordancia de 56.5% a 94.7% sin cambiar el modelo (Epilepsia) — el conocimiento del clínico está en la estructura, no en el algoritmo.

## ❓ Preguntas del día
- Si un LLM sufre anclaje por el texto igual que un R1, ¿el debiasing que enseñamos a humanos (generar alternativas, slow-down) transfiere al prompting — y se puede medir?
- ¿Debería 'reproducibilidad' ser un criterio de gate, junto a exactitud, antes de meter cualquier CDSS-LLM en un flujo de preparación ENAM/residentado?
- ¿Cómo distingo operacionalmente 'razonar' de 'recitar' en un residente — y el audit de contaminación temporal de JAMIA me da una métrica trasladable a un banco peruano?
- Si el razonamiento bayesiano no es un constructo único (Cronbach 0.43), ¿implica enseñar probabilidad clínica por escenario en vez de en abstracto?
- ¿Los modelos de razonamiento (o3/o1) son mejor analogía del 'Sistema 2' clínico que los conversacionales — y eso reordena cómo presento dual-process en el BMSE?

## 💡 Ideas del día
- (content) Carrusel IG + Reel: 'La IA también hace cierre prematuro' — o3 de 84% a 28% con una pista falsa; el anclaje cognitivo en humanos y máquinas, con un caso peruano de ejemplo.
- (paper) Paper empírico: '¿Razonan o recitan los médicos en formación?' — adaptar el audit de contaminación temporal de JAMIA a casos ENAM pre/post-fecha para medir razonamiento genuino vs memorización.
- (book) Capítulo BMSE/razonamiento dimensional: 'Dual-process en humanos y LLMs' — Sistema 1/2 como marco unificado, usando nurses (S1/S2), o3 vs conversacionales y el dual-system framework como evidencia.
- (content) Screencast YouTube (Aprendiz Experto): 'Cómo NO dejar que ChatGPT te ancle' — prompting anti-sesgo demostrado en vivo con casos clínicos, conectando debiasing humano y de máquina.
- (paper) Mini-revisión/perspectiva: 'Reproducibilidad y calibración como gates de calidad para CDSS-LLM en educación médica de precisión' — proponer el marco antes de que se formalice afuera.

---
_Fuentes: PubMed. Atribución a PubMed por sus términos de uso._
