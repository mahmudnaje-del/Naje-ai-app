import { ModelEndpoint } from '../types';

export const POINT_USD_VALUE = 0.02; // 1 Naje Point = $0.02 USD revenue equivalent

/**
 * Standardized Output Token Ceiling Categories
 * Prevents default 8,192 token truncation across all Gemini generation calls.
 */
export const OUTPUT_TOKEN_LIMITS = {
  criticReview: 4096,                 // الناقد's structured JSON verdict — short by design
  classification: 4096,               // Intent classification and safety guardrails
  memorySummary: 4096,                // Project memory item concise summarization
  imageCompiler: 4096,                // compileImagePrompt / applyCreativeLayers — prompt text compilation
  videoCompiler: 8192,                // compileVideoPrompt / auditVideoPrompt — shot lists and script directions
  documentChunk: 32000,               // document_writer/slide_writer — comprehensive chapters / slide batch
  documentSection: 16000,             // individual section audit & refinement
  slideJson: 8192,                    // presentation slide JSON structure
  fullstackContractSynthesis: 16000,  // Phase 2 — signatures, type definitions, and contract interfaces
  fullstackFileGeneration: 60000,      // Phase 3 — complete individual code files (close to 65,535 capacity)
  fullstackAudit: 16000,              // Phase 4/6 — structured lint and semantic audit findings
  agentPlan: 8192,                    // generateAgentProposal & planner function-calling
  agentAudit: 8192,                   // auditAgentStepResult verification
  voiceScript: 8192,                  // dialogue script structuring in agentExecutor
  audioSpeech: 8192,                  // TTS audio generation tokens
  mediaAnalysis: 8192,                // Multimodal OCR / image / audio inspection
  webGrounding: 16000,                // Google Search grounded research synthesis
  textChat: 32000,                    // conversational chat and deep thinking responses
  chatResponse: 32000,                // standard chat response ceiling
  uiBuilder: 32000,                   // UI components & interactive widgets generation
  uiPlan: 8192,                       // UI generation architecture & layout planning
  uiHtml: 32000,                      // full-page interactive UI HTML output
} as const;

export const SEED_ENDPOINTS: ModelEndpoint[] = [
  // TEXT / CORE TIERS (User-Facing Text Models — Token Metered)
  { 
    id: 'tier_lite', 
    featureGroup: 'text', 
    labelAr: 'Naje Lite (نص خفيف)', 
    modelId: 'gemini-3.5-flash-lite', 
    fallbackModelId: 'gemini-3.1-flash-lite',
    paramNotes: 'استجابة سريعة جداً واستهلاك توكنز منخفض',
    maxOutputTokens: 32000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    inputPointsPerBlock: 0.1,
    inputTokenBlockSize: 1000,
    outputPointsPerBlock: 0.1,
    outputTokenBlockSize: 1000,
    audioInputPointsPer1k: 0.2,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 0.25 }, 
    pointsPrice: 0,
    isBackground: false
  },
  { 
    id: 'tier_core', 
    featureGroup: 'text', 
    labelAr: 'Naje Core (نص قياسي)', 
    modelId: 'gemini-3.7-flash', 
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'متوازن وذكي (النموذج الافتراضي للذكاء المتطور)',
    maxOutputTokens: 32000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    inputPointsPerBlock: 0.1,
    inputTokenBlockSize: 1000,
    outputPointsPerBlock: 0.1,
    outputTokenBlockSize: 1000,
    audioInputPointsPer1k: 0.2,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 1.25 }, 
    pointsPrice: 0,
    isBackground: false
  },
  { 
    id: 'tier_max', 
    featureGroup: 'text', 
    labelAr: 'Naje Max (تفكير عميق)', 
    modelId: 'gemini-3.1-pro', 
    fallbackModelId: 'gemini-3.7-flash',
    paramNotes: 'أعلى دقة استدلالية وتفكير تحليلي متقدم', 
    maxOutputTokens: 32000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    inputPointsPerBlock: 0.1,
    inputTokenBlockSize: 1000,
    outputPointsPerBlock: 0.1,
    outputTokenBlockSize: 1000,
    audioInputPointsPer1k: 0.2,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 2.00 }, 
    pointsPrice: 0,
    isBackground: false
  },

  // BACKGROUND & INTERNAL COGNITIVE SERVICES (Council & Pipelines — Token Metered)
  {
    id: 'critic_review',
    featureGroup: 'text',
    labelAr: 'الناقد — مراجعة وتدقيق الطلبات قبل التنفيذ',
    modelId: 'gemini-3.5-flash-lite',
    fallbackModelId: 'gemini-3.1-flash-lite',
    paramNotes: 'فحص مسبق للغموض والتناقضات وتصحيحها',
    maxOutputTokens: 4096,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 0.25 },
    pointsPrice: 0,
    isBackground: true
  },
  {
    id: 'creative_council',
    featureGroup: 'text',
    labelAr: 'مجلس عقول ناجي — التوجيه الإبداعي والطبقات',
    modelId: 'gemini-3.7-flash',
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'المصوّر، المخرج، الكاتب، مهندس الصوتيات',
    maxOutputTokens: 8192,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 1.25 },
    pointsPrice: 0,
    isBackground: true
  },
  {
    id: 'agent_planner',
    featureGroup: 'text',
    labelAr: 'مخطط الوكلاء الذكي (Agent Planner)',
    modelId: 'gemini-3.7-flash',
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'تفكيك المهام وبناء خطط الوكيل وتعديلها',
    maxOutputTokens: 8192,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 1.25 },
    pointsPrice: 0,
    isBackground: true
  },
  {
    id: 'agent_auditor',
    featureGroup: 'text',
    labelAr: 'مدقق خطوات الوكيل (Agent Step Auditor)',
    modelId: 'gemini-3.7-flash',
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'التحقق الاستراتيجي وضبط الجودة لكل خطوة',
    maxOutputTokens: 8192,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 1.25 },
    pointsPrice: 0,
    isBackground: true
  },
  {
    id: 'agent_narrator',
    featureGroup: 'text',
    labelAr: 'سارد إنجازات الوكيل (Agent Step Narrator)',
    modelId: 'gemini-3.5-flash-lite',
    fallbackModelId: 'gemini-3.1-flash-lite',
    paramNotes: 'صياغة تأكيد إنجاز الخطوات بصوت ناجي الطبيعي',
    maxOutputTokens: 4096,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 0.25 },
    pointsPrice: 0,
    isBackground: true
  },
  {
    id: 'fullstack_builder',
    featureGroup: 'ui',
    labelAr: 'النسّاج — مهندس الأنظمة المتكاملة (Fullstack Engineer)',
    modelId: 'gemini-3.1-pro',
    fallbackModelId: 'gemini-3.7-flash',
    paramNotes: 'توليد ملفات البرمجة والأنظمة الكاملة (Phase 3)',
    maxOutputTokens: 60000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 2.00 },
    pointsPrice: 0,
    isBackground: false
  },
  {
    id: 'fullstack_auditor',
    featureGroup: 'ui',
    labelAr: 'النسّاج — مدقق الجودة والأنظمة (Fullstack Auditor)',
    modelId: 'gemini-3.7-flash',
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'التدقيق المعماري والبرمجي وفحص التوافق',
    maxOutputTokens: 16000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 1.25 },
    pointsPrice: 0,
    isBackground: true
  },
  {
    id: 'image_prompt_compiler',
    featureGroup: 'image',
    labelAr: 'مجمّع أوامر الصور (Image Prompt Compiler)',
    modelId: 'gemini-3.7-flash',
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'هيكلة وإثراء أوامر توليد الصور الاحترافية',
    maxOutputTokens: 4096,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 1.25 },
    pointsPrice: 0,
    isBackground: true
  },
  {
    id: 'video_prompt_compiler',
    featureGroup: 'video',
    labelAr: 'مخرج ومشرف سيناريو الفيديو (Video Director)',
    modelId: 'gemini-3.7-flash',
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'تصميم لقطات وسيناريو وحركات الكاميرا',
    maxOutputTokens: 8192,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 1.25 },
    pointsPrice: 0,
    isBackground: true
  },
  {
    id: 'image_auditor',
    featureGroup: 'image',
    labelAr: 'مدقق جودة وتطابق الصور (Image Verifier)',
    modelId: 'gemini-3.7-flash',
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'فحص مخرجات الصور ومقارنتها بالطلب الأصلي',
    maxOutputTokens: 4096,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 1.25 },
    pointsPrice: 0,
    isBackground: true
  },

  // UI STUDIO & DOCUMENTS
  { 
    id: 'ui_builder', 
    featureGroup: 'ui', 
    labelAr: 'استوديو الواجهات UI Studio', 
    modelId: 'gemini-3.7-flash', 
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'توليد المكونات التفاعلية وتصميم الصفحات',
    maxOutputTokens: 32000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 1.25 }, 
    pointsPrice: 0,
    isBackground: false
  },
  { 
    id: 'document_engine', 
    featureGroup: 'document', 
    labelAr: 'محرك تدقيق المستندات والشرائح (Auditor)', 
    modelId: 'gemini-3.7-flash', 
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'مراجعة وتدقيق جودة وتناسق المستندات والشرائح',
    maxOutputTokens: 16000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 1.25 }, 
    pointsPrice: 0,
    isBackground: true
  },
  { 
    id: 'document_writer', 
    featureGroup: 'document', 
    labelAr: 'كاتب المستندات (Document Writer)', 
    modelId: 'gemini-3.5-flash-lite', 
    fallbackModelId: 'gemini-3.1-flash-lite',
    paramNotes: 'توليد وصياغة أقسام المستندات والتقارير',
    maxOutputTokens: 32000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 0.25 }, 
    pointsPrice: 0,
    isBackground: false
  },
  { 
    id: 'slide_writer', 
    featureGroup: 'document', 
    labelAr: 'كاتب الشرائح (Slide Writer)', 
    modelId: 'gemini-3.5-flash-lite', 
    fallbackModelId: 'gemini-3.1-flash-lite',
    paramNotes: 'توليد وتأليف محتوى العروض التقديمية',
    maxOutputTokens: 32000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 0.25 }, 
    pointsPrice: 0,
    isBackground: false
  },
  {
    id: 'doc_standard',
    featureGroup: 'document',
    labelAr: 'مستند — A4 (لكل صفحة)',
    modelId: 'gemini-3.7-flash',
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'توليد وتصدير صفحات A4 الرسمية',
    maxOutputTokens: 32000,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_page', usd: 0.003 },
    pointsPrice: 0.15,
    isBackground: false
  },
  {
    id: 'doc_a5',
    featureGroup: 'document',
    labelAr: 'مستند — A5 (لكل صفحة)',
    modelId: 'gemini-3.7-flash',
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'توليد وتصدير صفحات A5 المصغرة',
    maxOutputTokens: 32000,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_page', usd: 0.002 },
    pointsPrice: 0.10,
    isBackground: false
  },
  {
    id: 'doc_slides',
    featureGroup: 'document',
    labelAr: 'عرض تقديمي — شرائح (لكل شريحة)',
    modelId: 'gemini-3.7-flash',
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'توليد وتصدير شرائح العرض التقديمي PPTX/PDF',
    maxOutputTokens: 32000,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_slide', usd: 0.004 },
    pointsPrice: 0.20,
    isBackground: false
  },
  {
    id: 'infographic_designer',
    featureGroup: 'document',
    labelAr: 'المصمم — محرك الإنفوجرافيك (Infographic Engine)',
    modelId: 'gemini-3.5-flash-lite',
    fallbackModelId: 'gemini-3.1-flash-lite',
    paramNotes: 'رسم بياني وتصميم إنفوجرافيك بصري وتصديره عبر Puppeteer (PNG + PDF)',
    maxOutputTokens: 16000,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_render', usd: 0.005 },
    pointsPrice: 0.50,
    isBackground: false
  },

  // IMAGE GENERATION (Flat Per-Unit Pricing)
  { 
    id: 'image_lite', 
    featureGroup: 'image', 
    labelAr: 'صورة — Naje Imagen Lite', 
    modelId: 'gemini-3.1-flash-lite-image', 
    fallbackModelId: 'gemini-3.1-flash-image',
    paramNotes: 'خفيف وسريع (0.5 نقطة افتراضياً)', 
    maxOutputTokens: 4096,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_image', usd: 0.01 }, 
    pointsPrice: 0.5,
    isBackground: false
  },
  { 
    id: 'image_spectra', 
    featureGroup: 'image', 
    labelAr: 'صورة — Naje Imagen (Spectra)', 
    modelId: 'gemini-3.1-flash-image', 
    fallbackModelId: 'gemini-3.1-flash-lite-image',
    paramNotes: 'توازن قياسي (نقطة واحدة افتراضياً)', 
    maxOutputTokens: 4096,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_image', usd: 0.02 }, 
    pointsPrice: 1.0,
    isBackground: false
  },
  { 
    id: 'image_addon', 
    featureGroup: 'image', 
    labelAr: 'إضافة دمج الصور المرجعية (Addon)', 
    modelId: 'gemini-3.7-flash', 
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'تكلفة دمج كل صورة مرجعية إضافية', 
    maxOutputTokens: 4096,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_image', usd: 0.002 }, 
    pointsPrice: 0.1,
    isBackground: false
  },
  { 
    id: 'image_fast', 
    featureGroup: 'image', 
    labelAr: 'صورة — سريعة (Fast)', 
    modelId: 'gemini-3.1-flash-lite-image', 
    fallbackModelId: 'gemini-3.1-flash-image',
    paramNotes: 'توليد فوري خفيف', 
    maxOutputTokens: 4096,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_image', usd: 0.04 }, 
    pointsPrice: 3,
    isBackground: false
  },
  { 
    id: 'image_standard', 
    featureGroup: 'image', 
    labelAr: 'صورة — معيارية Spectra (1K)', 
    modelId: 'gemini-3.1-flash-image', 
    fallbackModelId: 'gemini-3.1-flash-lite-image',
    paramNotes: '1024x1024 دقة قياسية', 
    maxOutputTokens: 4096,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_image', usd: 0.067 }, 
    pointsPrice: 5,
    isBackground: false
  },
  { 
    id: 'image_hd', 
    featureGroup: 'image', 
    labelAr: 'صورة — عالية الدقة Nova (2K)', 
    modelId: 'gemini-3-pro-image', 
    fallbackModelId: 'gemini-3.1-flash-image',
    paramNotes: '2048x2048 دقة فائقة', 
    maxOutputTokens: 4096,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_image', usd: 0.101 }, 
    pointsPrice: 10,
    isBackground: false
  },
  { 
    id: 'image_pro', 
    featureGroup: 'image', 
    labelAr: 'صورة — Nova Canvas (Pro)', 
    modelId: 'gemini-3-pro-image', 
    fallbackModelId: 'gemini-3.1-flash-image',
    paramNotes: 'جودة فائقة مع تحكم بالفرشاة والطبقات',
    maxOutputTokens: 4096,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_image', usd: 0.134 }, 
    pointsPrice: 12,
    isBackground: false
  },

  // VIDEO GENERATION (Flat Per-Unit Pricing)
  { 
    id: 'video_standard', 
    featureGroup: 'video', 
    labelAr: 'فيديو — Veo القياسي', 
    modelId: 'veo-3.1-lite-generate-preview', 
    fallbackModelId: 'gemini-omni-flash-preview',
    paramNotes: '720p سينمائي قياسي', 
    maxOutputTokens: 8192,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_second', usd: 0.05 }, 
    pointsPrice: 20,
    isBackground: false,
    supportedDurations: [4, 6, 8],
    supportsImageInput: true
  },
  { 
    id: 'video_veo_lite', 
    featureGroup: 'video', 
    labelAr: 'فيديو — Veo Lite (720p)', 
    modelId: 'veo-3.1-lite-generate-preview', 
    fallbackModelId: 'gemini-omni-flash-preview',
    paramNotes: '720p @ 5s', 
    maxOutputTokens: 8192,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_second', usd: 0.05 }, 
    pointsPrice: 25,
    isBackground: false,
    supportedDurations: [4, 6, 8],
    supportsImageInput: true
  },
  { 
    id: 'video_omni', 
    featureGroup: 'video', 
    labelAr: 'فيديو — Omni Flash', 
    modelId: 'gemini-omni-flash-preview', 
    fallbackModelId: 'veo-3.1-lite-generate-preview',
    paramNotes: 'Omni Multimodal Video', 
    maxOutputTokens: 8192,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_second', usd: 0.05 }, 
    isUnconfirmedCost: true, 
    pointsPrice: 20,
    isBackground: false,
    supportedDurations: [5, 10],
    supportsImageInput: true
  },

  // VOICE TTS (Flat Per-Unit Pricing)
  { 
    id: 'voice_tts', 
    featureGroup: 'voice', 
    labelAr: 'تسجيل صوتي — TTS طبيعي', 
    modelId: 'gemini-3.1-flash-tts-preview', 
    fallbackModelId: 'gemini-3.1-flash-tts-preview',
    paramNotes: 'تحويل النص إلى صوت بشري متناسق',
    maxOutputTokens: 8192,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_1m_audio_tokens', usd: 20.00 }, 
    isUnconfirmedCost: true, 
    pointsPrice: 2,
    isBackground: false
  },
  { 
    id: 'voice_tts_standard', 
    featureGroup: 'voice', 
    labelAr: 'تسجيل صوتي — حوار متعدد الأصوات', 
    modelId: 'gemini-3.1-flash-tts-preview', 
    fallbackModelId: 'gemini-3.1-flash-tts-preview',
    paramNotes: 'حوار بين شخصيات متعددة',
    maxOutputTokens: 8192,
    pricingType: 'per_generation',
    realCostPer: { unit: 'per_1m_audio_tokens', usd: 20.00 }, 
    isUnconfirmedCost: true, 
    pointsPrice: 2,
    isBackground: false
  },

  // TEXT TIER ENDPOINT ALIASES
  {
    id: 'text_lite',
    featureGroup: 'text',
    labelAr: 'نص خفيف (Lite Tier)',
    modelId: 'gemini-3.5-flash-lite',
    fallbackModelId: 'gemini-3.1-flash-lite',
    paramNotes: 'محادثة سريعة واستهلاك اقتصادي',
    maxOutputTokens: 32000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 0.25 },
    pointsPrice: 0,
    isBackground: false
  },
  {
    id: 'text_core',
    featureGroup: 'text',
    labelAr: 'نص قياسي (Core Tier)',
    modelId: 'gemini-3.7-flash',
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'محادثة متوازنة ذكية وسريعة',
    maxOutputTokens: 32000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 1.25 },
    pointsPrice: 0,
    isBackground: false
  },
  {
    id: 'text_max',
    featureGroup: 'text',
    labelAr: 'نص استدلالي (Max Tier)',
    modelId: 'gemini-3.1-pro',
    fallbackModelId: 'gemini-3.7-flash',
    paramNotes: 'تفكير تحليلي عميق ومعالجة معقدة',
    maxOutputTokens: 32000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 2.00 },
    pointsPrice: 0,
    isBackground: false
  },
  {
    id: 'ui_standard',
    featureGroup: 'ui',
    labelAr: 'واجهات — القياسي',
    modelId: 'gemini-3.7-flash',
    fallbackModelId: 'gemini-3.5-flash',
    paramNotes: 'توليد كود واجهات المستخدم',
    maxOutputTokens: 32000,
    pricingType: 'per_token',
    inputPointsPer1k: 0.1,
    outputPointsPer1k: 0.1,
    realCostPer: { unit: 'per_1m_input_tokens', usd: 1.25 },
    pointsPrice: 0,
    isBackground: false
  }
];

export const FALLBACK_MODEL_DEFAULTS: Record<string, string> = {
  tier_lite: 'gemini-3.1-flash-lite',
  tier_core: 'gemini-3.5-flash',
  tier_max: 'gemini-3.7-flash',
  text_lite: 'gemini-3.1-flash-lite',
  text_core: 'gemini-3.5-flash',
  text_max: 'gemini-3.7-flash',
  critic_review: 'gemini-3.1-flash-lite',
  creative_council: 'gemini-3.5-flash',
  agent_planner: 'gemini-3.5-flash',
  agent_auditor: 'gemini-3.5-flash',
  agent_narrator: 'gemini-3.1-flash-lite',
  fullstack_builder: 'gemini-3.7-flash',
  fullstack_auditor: 'gemini-3.5-flash',
  image_prompt_compiler: 'gemini-3.5-flash',
  video_prompt_compiler: 'gemini-3.5-flash',
  image_auditor: 'gemini-3.5-flash',
  image_standard: 'gemini-3.1-flash-lite-image',
  image_hd: 'gemini-3.1-flash-image',
  image_pro: 'gemini-3.1-flash-image',
  image_fast: 'gemini-3.1-flash-image',
  image_lite: 'gemini-3.1-flash-image',
  image_spectra: 'gemini-3.1-flash-lite-image',
  image_addon: 'gemini-3.5-flash',
  video_veo_lite: 'gemini-omni-flash-preview',
  video_standard: 'gemini-omni-flash-preview',
  video_omni: 'veo-3.1-lite-generate-preview',
  video_hd: 'veo-3.1-lite-generate-preview',
  ui_builder: 'gemini-3.5-flash',
  ui_standard: 'gemini-3.5-flash',
  voice_tts: 'gemini-3.1-flash-tts-preview',
  voice_tts_standard: 'gemini-3.1-flash-tts-preview',
  document_engine: 'gemini-3.5-flash',
  doc_standard: 'gemini-3.5-flash',
  doc_a5: 'gemini-3.5-flash',
  doc_slides: 'gemini-3.5-flash',
  document_writer: 'gemini-3.1-flash-lite',
  slide_writer: 'gemini-3.1-flash-lite',
  infographic_designer: 'gemini-3.1-flash-lite'
};

export const FALLBACK_OUTPUT_LIMITS: Record<string, number> = {
  tier_lite: 32000,
  tier_core: 32000,
  tier_max: 32000,
  text_lite: 32000,
  text_core: 32000,
  text_max: 32000,
  critic_review: 4096,
  creative_council: 8192,
  agent_planner: 8192,
  agent_auditor: 8192,
  agent_narrator: 4096,
  fullstack_builder: 60000,
  fullstack_auditor: 16000,
  image_prompt_compiler: 4096,
  video_prompt_compiler: 8192,
  image_auditor: 4096,
  image_standard: 4096,
  image_hd: 4096,
  image_pro: 4096,
  image_fast: 4096,
  video_veo_lite: 8192,
  video_standard: 8192,
  video_omni: 8192,
  video_hd: 8192,
  ui_builder: 32000,
  ui_standard: 32000,
  voice_tts: 8192,
  voice_tts_standard: 8192,
  document_engine: 16000,
  doc_standard: 16000,
  document_writer: 32000,
  slide_writer: 32000,
};

export const FALLBACK_DEFAULTS: Record<string, string> = {
  tier_lite: 'gemini-3.5-flash-lite',
  tier_core: 'gemini-3.7-flash',
  tier_max: 'gemini-3.1-pro',
  text_lite: 'gemini-3.5-flash-lite',
  text_core: 'gemini-3.7-flash',
  text_max: 'gemini-3.1-pro',
  critic_review: 'gemini-3.5-flash-lite',
  creative_council: 'gemini-3.7-flash',
  agent_planner: 'gemini-3.7-flash',
  agent_auditor: 'gemini-3.7-flash',
  agent_narrator: 'gemini-3.5-flash-lite',
  fullstack_builder: 'gemini-3.1-pro',
  fullstack_auditor: 'gemini-3.7-flash',
  image_prompt_compiler: 'gemini-3.7-flash',
  video_prompt_compiler: 'gemini-3.7-flash',
  image_auditor: 'gemini-3.7-flash',
  image_standard: 'gemini-3.1-flash-image',
  image_hd: 'gemini-3-pro-image',
  image_pro: 'gemini-3-pro-image',
  image_fast: 'gemini-3.1-flash-lite-image',
  video_veo_lite: 'veo-3.1-lite-generate-preview',
  video_standard: 'veo-3.1-lite-generate-preview',
  video_omni: 'gemini-omni-flash-preview',
  ui_builder: 'gemini-3.7-flash',
  ui_standard: 'gemini-3.7-flash',
  voice_tts: 'gemini-3.1-flash-tts-preview',
  voice_tts_standard: 'gemini-3.1-flash-tts-preview',
  document_engine: 'gemini-3.7-flash',
  doc_standard: 'gemini-3.7-flash',
  document_writer: 'gemini-3.5-flash-lite',
  slide_writer: 'gemini-3.5-flash-lite'
};

export function estimatePerRequestUsdCost(endpoint: ModelEndpoint): number {
  const { unit, usd } = endpoint.realCostPer;
  switch (unit) {
    case 'per_image':
      return usd;
    case 'per_second':
      return usd * 5; // average 5 seconds video
    case 'per_1m_input_tokens':
    case 'per_1m_output_tokens':
      return (usd / 1000000) * 4000; // avg 4k tokens per text turn
    case 'per_1m_audio_tokens':
      return (usd / 1000000) * 2500; // avg 2.5k audio tokens
    default:
      return usd;
  }
}

export function calculateMarginPercentage(endpoint: ModelEndpoint): number {
  if (endpoint.pricingType === 'per_token') {
    // For per-token pricing: 1,000 tokens pricing vs 1,000 tokens cost
    const inRate = endpoint.inputPointsPer1k ?? 0.1;
    const outRate = endpoint.outputPointsPer1k ?? 0.1;
    const avgPointsPer1k = (inRate + outRate) / 2;
    const revenuePer1kUsd = avgPointsPer1k * POINT_USD_VALUE; // e.g. 0.1 * $0.02 = $0.002 per 1k tokens ($2.00 / 1M)
    const costPer1kUsd = (endpoint.realCostPer.usd / 1000);   // e.g. $0.25 / 1000 = $0.00025 per 1k tokens ($0.25 / 1M)
    if (revenuePer1kUsd <= 0) return 0;
    const margin = ((revenuePer1kUsd - costPer1kUsd) / revenuePer1kUsd) * 100;
    return Math.round(margin * 10) / 10;
  }

  const revenueUsd = (endpoint.pointsPrice || 0) * POINT_USD_VALUE;
  if (revenueUsd <= 0) return 0;
  const costUsd = estimatePerRequestUsdCost(endpoint);
  const margin = ((revenueUsd - costUsd) / revenueUsd) * 100;
  return Math.round(margin * 10) / 10;
}
