export type Lang = "en" | "hi";

export interface TranslationSet {
  govIndia: string;
  ministry: string;
  skipToContent: string;
  accessibility: string;
  helpline: string;
  screenReader: string;
  nav: {
    home: string;
    dashboard: string;
    schemes: string;
    eligibility: string;
    chatbot: string;
    track: string;
    help: string;
  };
  hero: {
    tagline: string;
    subtext: string;
    applyNow: string;
    trackApplication: string;
    badge: string;
  };
  footer: {
    rights: string;
    lastUpdated: string;
  };
}

export const translations: Record<Lang, TranslationSet> = {
  en: {
    govIndia: "Government of India",
    ministry: "Ministry of Tribal Affairs",
    skipToContent: "Skip to main content",
    accessibility: "Accessibility",
    helpline: "Helpline: 1800-11-8283",
    screenReader: "Screen Reader Access",
    nav: {
      home: "Home",
      dashboard: "Scholarship Dashboard",
      schemes: "Schemes",
      eligibility: "Eligibility",
      chatbot: "JAGO Chatbot",
      track: "Track Status",
      help: "Help",
    },
    hero: {
      tagline: "One Platform. Five Scholarships. One Student Journey.",
      subtext:
        "TRIBAL SCHOLAR ONE (TS-One) unifies Pre-Matric, Post-Matric, Top Class, NFST and NOS scholarships for Scheduled Tribe students into a single, transparent, DBT-enabled journey.",
      applyNow: "Apply Now",
      trackApplication: "Track Application",
      badge: "Secure • DigiLocker Enabled • DBT Integrated",
    },
    footer: {
      rights: "Website content owned by Ministry of Tribal Affairs, Government of India",
      lastUpdated: "Last Updated",
    },
  },
  hi: {
    govIndia: "भारत सरकार",
    ministry: "जनजातीय कार्य मंत्रालय",
    skipToContent: "मुख्य सामग्री पर जाएं",
    accessibility: "सुगम्यता",
    helpline: "हेल्पलाइन: 1800-11-8283",
    screenReader: "स्क्रीन रीडर एक्सेस",
    nav: {
      home: "मुख्य पृष्ठ",
      dashboard: "छात्रवृत्ति डैशबोर्ड",
      schemes: "योजनाएं",
      eligibility: "पात्रता",
      chatbot: "जागो चैटबॉट",
      track: "आवेदन स्थिति",
      help: "सहायता",
    },
    hero: {
      tagline: "एक मंच। पांच छात्रवृत्तियां। एक छात्र यात्रा।",
      subtext:
        "TRIBAL SCHOLAR ONE (TS-One) अनुसूचित जनजाति के छात्रों के लिए प्री-मैट्रिक, पोस्ट-मैट्रिक, टॉप क्लास, NFST और NOS छात्रवृत्तियों को एक पारदर्शी, DBT-सक्षम यात्रा में एकीकृत करता है।",
      applyNow: "अभी आवेदन करें",
      trackApplication: "आवेदन ट्रैक करें",
      badge: "सुरक्षित • डिजिलॉकर सक्षम • DBT एकीकृत",
    },
    footer: {
      rights: "वेबसाइट सामग्री जनजातीय कार्य मंत्रालय, भारत सरकार के स्वामित्व में है",
      lastUpdated: "अंतिम अद्यतन",
    },
  },
};
