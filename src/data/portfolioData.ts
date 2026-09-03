import { Publication, AcademicExperience, SkillGroup, ContactInfo } from '../types';

export const contactInfo: ContactInfo = {
  name: "Abel Mulat",
  title: "Natural Language Processing Researcher",
  affiliation: "Ethiopian Artificial Intelligence Institute (EAII)",
  location: "Addis Ababa, Ethiopia",
  email: "Abelmulat21@gmail.com",
  scholarUrl: "https://scholar.google.com/citations?user=Flv67eoAAAAJ&hl=en",
  githubUrl: "https://github.com",
  huggingfaceUrl: "https://huggingface.co/EthioNLP",
};

export const bioText = {
  short: "Researcher in Natural Language Processing & Speech Technologies specializing in low-resource African languages, multilingual ASR, and Ethiopic script OCR.",
  full: "I am an NLP and Speech Technology researcher based in Addis Ababa, Ethiopia. My research is centered on closing the technological gap for underrepresented Afroasiatic languages—particularly Amharic, Tigrinya, Afaan Oromo, Sidaama, and Wolaytta. My work encompasses end-to-end multilingual Automatic Speech Recognition (ASR), Language Identification (LID), spoken court transcription, and Optical Character Recognition (OCR) for complex Ethiopic scripts."
};

export const publications: Publication[] = [
  {
    id: "ethio-asr-2026",
    title: "Ethio-ASR: Joint Multilingual Speech Recognition and Language Identification for Ethiopian Languages",
    authors: ["Abel Mulat Alemu", "Co-authors et al."],
    year: 2026,
    venue: "arXiv Preprint / Under Review",
    abstract: "Presents Ethio-ASR, a unified multilingual Automatic Speech Recognition (ASR) and Language Identification (LID) framework covering five distinct Ethiopian languages: Amharic, Tigrinya, Afaan Oromo, Sidaama, and Wolaytta—spanning the Semitic, Cushitic, and Omotic branches of the Afroasiatic family. Trained and benchmarked on the WAXAL corpus and custom curated speech datasets, the model explores acoustic parameter sharing and cross-lingual phonetic transfer to achieve superior word error rates (WER) over previous single-language baselines.",
    tags: ["Speech Recognition", "Multilingual ASR", "Language Identification", "Low-Resource NLP", "Afroasiatic Languages"],
    scholarUrl: "https://scholar.google.com/citations?user=Flv67eoAAAAJ&hl=en",
    paperUrl: "https://arxiv.org/abs/2602.XXXXX",
    codeUrl: "https://huggingface.co/EthioNLP",
    citationsCount: 1,
    featured: true,
    bibtex: `@article{alemu2026ethioasr,
  title={Ethio-ASR: Joint Multilingual Speech Recognition and Language Identification for Ethiopian Languages},
  author={Alemu, Abel Mulat and others},
  journal={arXiv preprint},
  year={2026},
  url={https://scholar.google.com/citations?user=Flv67eoAAAAJ&hl=en}
}`
  },
  {
    id: "ethiopic-ocr-2023",
    title: "Typewritten OCR Model for Ethiopic Characters",
    authors: ["Abel Mulat Alemu", "Research Team"],
    year: 2023,
    venue: "Technical Research & Conference Proceedings",
    abstract: "Introduces a robust Optical Character Recognition (OCR) pipeline explicitly trained for typewritten Ethiopic (Ge'ez) script. Ethiopic script contains over 340 syllabic glyph variations that suffer from visual degradation and severe similarity across vowel orders. This work formulates a convolutional and sequence-to-sequence recognition architecture with targeted morphological data augmentation, substantially reducing character error rates across archival administrative and legal records.",
    tags: ["OCR", "Ethiopic / Ge'ez Script", "Document AI", "Computer Vision", "Sequence Modeling"],
    scholarUrl: "https://scholar.google.com/citations?user=Flv67eoAAAAJ&hl=en",
    paperUrl: "https://scholar.google.com/citations?user=Flv67eoAAAAJ&hl=en",
    featured: true,
    bibtex: `@article{alemu2023typewritten,
  title={Typewritten OCR Model for Ethiopic Characters},
  author={Alemu, Abel Mulat and others},
  journal={Academic Proceedings on Machine Learning and Document Analysis},
  year={2023},
  url={https://scholar.google.com/citations?user=Flv67eoAAAAJ&hl=en}
}`
  },
  {
    id: "court-hearing-transcription-2023",
    title: "DNN-Based Supervised Spontaneous Court Hearing Transcription for Amharic",
    authors: ["Abel Mulat Alemu", "Co-researchers"],
    year: 2023,
    venue: "Federal Supreme Court of Ethiopia & EAII Research Report",
    abstract: "Presents an automated speech-to-text transcription system deployed for real-world spontaneous court hearings at the Federal Supreme Court of Ethiopia. The work addresses real-world acoustic challenges of judicial proceedings in Amharic: overlapping dialogue, varied speaker acoustics, spontaneous disfluencies, and dense legal vocabulary through deep neural acoustic models coupled with domain-adapted n-gram and neural language models.",
    tags: ["Amharic ASR", "Legal AI", "Spontaneous Speech", "Acoustic Modeling", "Audio Transcription"],
    scholarUrl: "https://scholar.google.com/citations?user=Flv67eoAAAAJ&hl=en",
    paperUrl: "https://scholar.google.com/citations?user=Flv67eoAAAAJ&hl=en",
    citationsCount: 1,
    featured: true,
    bibtex: `@article{alemu2023courttranscription,
  title={DNN-Based Supervised Spontaneous Court Hearing Transcription for Amharic},
  author={Alemu, Abel Mulat and others},
  journal={Federal Supreme Court & Ethiopian AI Institute Technical Report},
  year={2023},
  url={https://scholar.google.com/citations?user=Flv67eoAAAAJ&hl=en}
}`
  }
];

export const academicBackground: AcademicExperience[] = [
  {
    role: "Natural Language Processing Researcher",
    institution: "Ethiopian Artificial Intelligence Institute (EAII)",
    location: "Addis Ababa, Ethiopia",
    period: "2022 - Present",
    description: "Conducting core research in low-resource speech technologies, multilingual ASR, language identification, and OCR for Ethiopian languages.",
    highlights: [
      "Lead developer on multilingual speech recognition systems covering 5 Ethiopian languages",
      "Collaborated with the Federal Supreme Court of Ethiopia to build domain-specific courtroom transcription tools",
      "Authored research publications and presented advancements in Afroasiatic NLP"
    ]
  },
  {
    role: "B.Sc. in Electrical and Computer Engineering",
    institution: "Arba Minch University (AMU)",
    location: "Arba Minch, Ethiopia",
    period: "Graduated",
    description: "Rigorous academic foundation in electrical and computer engineering, digital signal processing, computing algorithms, and computational modeling.",
    highlights: [
      "Specialized in computer engineering, digital systems, and computational intelligence",
      "Comprehensive coursework in signals & systems, algorithms, embedded systems, and software engineering"
    ]
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Speech & NLP",
    items: [
      "Automatic Speech Recognition (ASR)",
      "Language Identification (LID)",
      "Acoustic Modeling",
      "Wav2Vec 2.0 & Whisper",
      "Optical Character Recognition (OCR)",
      "Ethiopic (Ge'ez) Normalization",
      "Low-Resource Language Modeling"
    ]
  },
  {
    category: "Machine Learning & Frameworks",
    items: [
      "PyTorch",
      "Hugging Face (Transformers & Datasets)",
      "Torchaudio",
      "scikit-learn",
      "Kaldi / ESPnet",
      "OpenCV",
      "NumPy & Pandas"
    ]
  },
  {
    category: "Software & Engineering",
    items: [
      "Python",
      "C++",
      "TypeScript / JavaScript",
      "Linux / Bash Scripting",
      "Git & GitHub Actions",
      "Docker",
      "FastAPI / RESTful APIs"
    ]
  },
  {
    category: "Languages of Research",
    items: [
      "Amharic (አማርኛ)",
      "Tigrinya (ትግርኛ)",
      "Afaan Oromoo",
      "Sidaamu Afoo",
      "Wolaytta",
      "English"
    ]
  }
];
