import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/home/SocialProof";
import Hook from "@/components/sections/Hook";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import WhatsIncluded from "@/components/sections/WhatsIncluded";
import DashboardShowcase from "@/components/sections/DashboardShowcase";
import Syllabus from "@/components/sections/Syllabus";
import Bonus from "@/components/sections/Bonus";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import MidCTA from "@/components/sections/MidCTA";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const courseSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "שוק ההון - בנעלי בית",
      "description": "תוכנית דיגיטלית ללמוד להשקיע בשוק ההון מאפס. 32 שיעורים, 14 דשבורדים חכמים, בדיקת תיק אישית וגישה לשנה שלמה.",
      "url": "https://matzavtzvira.co.il/course",
      "provider": {
        "@type": "Organization",
        "name": "מצב צבירה",
        "url": "https://matzavtzvira.co.il"
      },
      "instructor": {
        "@type": "Person",
        "name": "רבקי וייס",
        "jobTitle": "מתכננת פיננסית"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "תוכנית דיגיטלית",
          "price": "297",
          "priceCurrency": "ILS",
          "availability": "https://schema.org/InStock",
          "url": "https://matzavtzvira.co.il/course"
        }
      ],
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "inLanguage": "he"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "329",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "מלכה פרל" },
          "reviewBody": "ביום שאחרי השיעור על כספים אבודים גיליתי פנסיה רדומה בסכום של 23,000 ש״ח. בהמלצת רבקי שיניתי את המסלול, והיום אני צפויה לקבל מעל 750,000 ש״ח יותר.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "שרית לוין" },
          "reviewBody": "רבקי הפכה את הכי מורכב לפשוט וברור. כשעשיתי את החשבון והבנתי שהרווחתי לטווח הארוך קרוב למיליון ש\"ח - לא האמנתי למראה עיניי.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "בסוף התוכנית - מה יש לי שלא היה לפני?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "אסטרטגיית השקעות מותאמת לך אישית. תדעי בדיוק מה בתיק שלך, מה לשנות ומה לעשות מחר בבוקר. ביטחון מלא בתיק שלך."
          }
        },
        {
          "@type": "Question",
          "name": "אין לי כסף פנוי כרגע - זה בשבילי?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "בדיוק בשבילך. את לא צריכה כסף פנוי - את צריכה לדעת איפה הכסף שכבר יש לך הולך לאיבוד. פנסיה, קרן השתלמות, חיסכון לכל ילד - הכסף כבר שם, רק לא עובד בשבילך."
          }
        },
        {
          "@type": "Question",
          "name": "אני לא מבינה כלום בכסף - זה בשבילי?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "בדיוק בשבילך. התוכנית נבנתה למי שמתחילה מאפס. אם את יודעת לקנות בסופר - את יכולה לעשות את זה."
          }
        },
        {
          "@type": "Question",
          "name": "כמה זמן זה יקח לי?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "השיעורים קצרים וממוקדים. אפשר ללמוד בקצב שלך, בכל זמן פנוי - גם 20 דקות ביום מספיקות. הגישה פתוחה שנה שלמה."
          }
        },
        {
          "@type": "Question",
          "name": "מה אם לא התאים לי?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "14 יום אחריות מלאה. לא מרוצה - מחזירים הכל בלי שאלות."
          }
        },
        {
          "@type": "Question",
          "name": "יש לי כבר סוכן שדואג להכל.",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "נהדר. אבל - האם את יודעת כמה הוא מרוויח עלייך? אחרי התוכנית תדעי לשאול את השאלות הנכונות. ותופתעי מהתשובות."
          }
        }
      ]
    }
  ]
};

export const metadata = {
  title: "תוכנית השקעות לנשים | שוק ההון בנעלי בית | מצב צבירה",
  description: "32 שיעורים, 14 דשבורדים ובדיקת תיק אישית. ללמוד להשקיע בשוק ההון מאפס - בתוכנית הדיגיטלית של רבקי וייס. מתאימה לנשים עם אפס ניסיון. 297 ש\"ח בלבד.",
};

export default function CoursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <Navigation />

      <FloatingCTA />

      <main>
        <Hero />
        {/* dark navy → blue */}
        <div style={{ height: 56, background: "#124AF0", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,56" fill="#060D3C"/>
          </svg>
        </div>
        <SocialProof />
        {/* blue → dark navy */}
        <div style={{ height: 56, background: "#060D3C", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,56" fill="#124AF0"/>
          </svg>
        </div>
        <WhatsIncluded />
        {/* dark navy → white */}
        <div style={{ height: 56, background: "#FFFFFF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,56" fill="#060D3C"/>
          </svg>
        </div>
        <Syllabus />
        {/* white → light */}
        <div style={{ height: 40, background: "#F4F7FF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,40" fill="#FFFFFF"/>
          </svg>
        </div>
        <DashboardShowcase />
        {/* light → white */}
        <div style={{ height: 40, background: "#FFFFFF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,40" fill="#F4F7FF"/>
          </svg>
        </div>
        <Bonus />
        {/* white → white: no divider needed */}
        <Testimonials />
        {/* white → light */}
        <div style={{ height: 40, background: "#F4F7FF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,40" fill="#FFFFFF"/>
          </svg>
        </div>
        <Pricing />
        {/* light → blue (story) */}
        <div style={{ height: 56, background: "#124AF0", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,56" fill="#F4F7FF"/>
          </svg>
        </div>
        <Hook />
        {/* blue → white */}
        <div style={{ height: 56, background: "#FFFFFF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,56" fill="#124AF0"/>
          </svg>
        </div>
        <About />
        {/* white → blue (MidCTA) */}
        <div style={{ height: 56, background: "#124AF0", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,56" fill="#FFFFFF"/>
          </svg>
        </div>
        <MidCTA />
        {/* blue → light */}
        <div style={{ height: 40, background: "#F4F7FF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,40" fill="#124AF0"/>
          </svg>
        </div>
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
