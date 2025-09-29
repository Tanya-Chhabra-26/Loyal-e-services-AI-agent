// content.ts

export interface Stat {
  percentage: string;
  text: string;
  source: string;
  bg: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  image: string;
}

export interface FeatureCard {
  title: string;
  desc: string;
  icon: string;
}

export interface Step {
  title: string;
  img: string;
  desc: string;
}

export interface faq {
  id: number;
  question: string;
  answer: string;
}

export interface TechnoService   {
    title: string,
    img: string,
    desc: string
}

export interface strategicServices   {
    title: string,
    img: string,
    desc: string
}

export const stats: Stat[] = [
  {
    percentage: '66%',
    text: '“66% would prefer to view something beautifully designed vs. simple and plain.”',
    source: 'Adobe, 2015',
    bg: 'rgba(217, 217, 217, 0.5)',
  },
  {
    percentage: '85%',
    text: '“85% of consumers are more likely to buy after watching a product video.”',
    source: 'Wyzowl, 2022',
    bg: 'rgba(255, 195, 0, 0.6)',
  },
  {
    percentage: '72%',
    text: '“72% of people prefer to learn about a product via video.”',
    source: 'HubSpot, 2021',
    bg: 'rgba(0, 80, 160, 0.6)',
  },
];

export const items: ServiceItem[] = [
  { id: 1, title: "Whiteboard Videos", image: "/main/services/white-board.png" },
  { id: 2, title: "Explainer Videos", image: "/main/services/explainer-videos.jpg" },
  { id: 3, title: "Premium Animated Videos", image: "/main/services/premium-animated.jpg" },
  { id: 4, title: "Motion Graphics", image: "/main/service.png" },
  { id: 5, title: "Short Vertical Videos (TikTok, Reels, Shorts)", image: "/main/service.png" },
  { id: 6, title: "E-learning / Educational Animations", image: "/main/services/e-learning.jpg" },
  { id: 7, title: "Medical & Health Animations", image: "/main/services/medical.jpg" },
  { id: 8, title: "Character/Mascot Animations", image: "/main/services/character.jpg" },
  { id: 9, title: "Interactive Explainers", image: "/main/services/interactive-explainers.jpg" },
  { id: 10, title: "Multilingual Videos", image: "/main/services/multilingual.jpg" },
  { id: 11, title: "Animated Ads", image: "/main/services/animated-ads.jpg" },
  { id: 12, title: "Voice-to-Video (AI Powered)", image: "/main/service.png" },
];

export const cards: FeatureCard[] = [
  {
    title: "Great Value For Money",
    desc: "We offer the best value for money, as our custom videos are priced at a reasonable rate without compromising on quality.",
    icon: '/main/dollar-rounded.svg',
  },
  {
    title: "No Hidden Fees",
    desc: "Each package is priced per second, and everything you need to create a professional video which includes 1 voice over, 1 script, and 1 finished video, so there are no hidden fees or unexpected costs",
    icon: '/main/eye-off.svg',
  },
  {
    title: "Drive Engagement",
    desc: "Our videos are proven to drive engagement, with 4x as many customers preferring to watch a video about a product than read about it (Animoto).",
    icon: '/main/drive.svg',
  },
  {
    title: "Boost Conversions",
    desc: "By including a video on a landing page, you can increase conversion rates by up to 80%, which is why our videos are an essential part of any marketing strategy (Unbounce).",
    icon: '/main/boost.svg',
  },
];

export const steps: Step[] = [
  {
    title: "Purpose and Message",
    img: '/main/target.svg',
    desc: "Clearly define the goal of the animation and the core message it aims to communicate, ensuring a focused and impactful visual story.",
  },
  {
    title: "Design and Animation",
    img: '/main/design-thinking.svg',
    desc: "Create visually appealing elements in line with brand aesthetics, utilizing animation techniques to tell a cohesive and visually captivating story.",
  },
  {
    title: "Scripting and Voiceover",
    img: '/main/audio-waves.svg',
    desc: "Craft a compelling script and choose a suitable voice to align with the animation's purpose, enhancing engagement and resonance with the target audience.",
  },
  {
    title: "Storyboarding",
    img: '/main/story-board.svg',
    desc: "Develop a visual roadmap through storyboarding, outlining the sequence of scenes and key events to guide the animation's flow and narrative.",
  },
  {
    title: "Sound and Music",
    img: '/main/guitar.svg',
    desc: "Integrate impactful sound effects and background music to enhance the viewer's experience, setting the mood and reinforcing key points in the animation.",
  },
  {
    title: "Testing and Refinement",
    img: '/main/testing.svg',
    desc: "Conduct thorough testing, gathering feedback to refine the animation for a polished final product, ensuring it meets both quality standards and the intended message.",
  },
];

export const mainFaq: faq[] = [
  {
    id: 1,
    question: "What types of services does TechnoAI provide?",
    answer:
      "TechnoAI offers AI-powered animated videos, branding design, motion graphics, multilingual storytelling, and promotional videos—all tailored to boost engagement and conversions at a fraction of traditional agency costs.",
  },
  {
    id: 2,
    question: "How does your animation and video creation process work?",
    answer:
      "Our 6-step workflow includes defining your message, script writing, professional voiceover, storyboarding, design & animation, and final testing—ensuring a stunning, on-brand final product.",
  },
  {
    id: 3,
    question: "Can I customize the video to match my brand?",
    answer:
      "Yes! We fully tailor every project to your brand’s voice, style, color palette, and goals. You’ll be involved at every checkpoint to ensure alignment with your vision.",
  },
  {
    id: 4,
    question: "How long does it take to deliver the final video?",
    answer:
      "Standard delivery takes approximately 4 weeks, depending on the scope. We also offer express delivery options—just mention your deadline while placing an order.",
  },
  {
    id: 5,
    question: "How do I place an order?",
    answer:
      "Simply visit our site, choose your service (e.g., animation, domain, branding), provide your project details, and proceed to checkout. Our team takes care of the rest!",
  },
  {
    id: 6,
    question: "Can I buy or transfer a domain name on your platform?",
    answer:
      "Yes, you can search and buy domains directly from our platform. Domains can be transferred to your preferred registrar, and we provide EPP/Auth codes upon request.",
  },
  {
    id: 7,
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit/debit cards, UPI, PayPal, and bank transfers. All transactions are secured with industry-standard encryption.",
  },
  {
    id: 8,
    question: "What if I'm not satisfied with the final video?",
    answer:
      "Client satisfaction is our priority. If you're not happy, we'll revise the video based on your feedback until you're fully satisfied.",
  },
  {
    id: 9,
    question: "Can I see examples of your past work?",
    answer:
      "Yes, we’re proud of our portfolio! You can view previous animations and design samples on our website or request specific case studies relevant to your industry.",
  },
  {
    id: 10,
    question: "Do you offer an affiliate or revenue-sharing program?",
    answer:
      "Absolutely! Join our affiliate program and earn commissions by promoting TechnoAI. Track your performance using your custom dashboard.",
  },
];


export const animationFaq: faq[] = [
  {
    id: 1,
    question: 'What services do you offer?',
    answer:
      'We provide a wide range of digital services including AI-powered video creation, domain registration, branding design, motion graphics, and web development. Each service is designed to boost your online presence and maximize results.',
  },
  {
    id: 2,
    question: 'How do I get started with your services?',
    answer:
      'Getting started is easy! Just visit the relevant service page, choose your package, and complete the checkout process. Our team will immediately start working on your order and keep you updated throughout.',
  },
  {
    id: 3,
    question: 'Can you customize your services to match my brand?',
    answer:
      'Absolutely. Whether it’s a video, website, or brand identity, we tailor everything to align perfectly with your vision, style, and target audience.',
  },
  {
    id: 4,
    question: 'What’s your turnaround time?',
    answer:
      'Turnaround depends on the service and package selected. For example, standard video projects take around 4 weeks. Faster delivery is available upon request.',
  },
  {
    id: 5,
    question: 'What if I’m not satisfied with the final result?',
    answer:
      'Client satisfaction is our priority. If something doesn’t meet your expectations, we offer revisions as per your plan until you\'re 100% happy with the result.',
  },
  {
    id: 6,
    question: 'Do you have an affiliate or referral program?',
    answer:
      'Yes! You can join our affiliate program to earn revenue for every successful referral. You’ll get access to a dashboard to track performance and payouts in real time.',
  },
];


export const domainFaq: faq[] = [
  {
    id: 1,
    question: 'How do I purchase a domain from your website?',
    answer:
      'Simply search for your desired domain using our search bar, click on "Buy Now" if it’s available, and proceed to checkout. You’ll receive confirmation and instructions after payment.',
  },
  {
    id: 2,
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit/debit cards, PayPal, UPI, and bank transfers. All transactions are secured with industry-standard encryption.',
  },
  {
    id: 3,
    question: 'What happens after I purchase a domain?',
    answer:
      'Once payment is completed, you’ll receive an email confirmation. The domain will either be transferred to your registrar or to your account on our platform, depending on your selection during checkout.',
  },
  {
    id: 4,
    question: 'Can I transfer the domain to another registrar?',
    answer:
      'Yes, all domains are eligible for transfer after the mandatory ICANN holding period (typically 60 days). We’ll provide the EPP/Auth code upon request.',
  },
  {
    id: 5,
    question: 'Do you charge any transfer fees?',
    answer:
      'We don’t charge any hidden fees for domain transfers. However, the receiving registrar may have standard domain transfer charges.',
  },
  {
    id: 6,
    question: 'Are there any additional charges besides the domain price?',
    answer:
      'No. The price you see is the final price unless you opt for add-ons like hosting, email, or WHOIS privacy protection.',
  },
];

export const technoAiFaq: faq[] = [
  {
    id: 1,
    question: 'What AI-powered services does TechnoAI provide?',
    answer:
      'TechnoAI provides AI-driven animated video creation, branding design, motion graphics, and high-converting storytelling videos. All our services are designed to boost your brand’s visibility and engagement, at up to 80% lower cost than traditional agencies.',
  },
  {
    id: 2,
    question: 'How does your video animation process work?',
    answer:
      'Our 6-step animation workflow includes defining your message, script writing, professional voiceover, storyboarding, design + animation, and final testing. This ensures a smooth, scalable, and stunning video tailored to your goals.',
  },
  {
    id: 3,
    question: 'What’s included in each TechnoAI pricing plan?',
    answer:
      'Every plan includes a persuasive script, premium voice-over, 2 revisions, and guaranteed delivery within 4+ weeks. Upgrade to Pro or Premium for access to our elite animation team and custom graphic design.',
  },
  {
    id: 4,
    question: 'How fast will I receive my animated video?',
    answer:
      'Standard delivery takes around 4 weeks. If you need it sooner, we offer express options. Just mention your deadline during the request and we’ll align with your launch timeline.',
  },
  {
    id: 5,
    question: 'Can I review and provide feedback during the animation project?',
    answer:
      'Yes — collaboration is core to our process. You’ll get checkpoints to review voiceovers, visuals, and animation drafts, ensuring your vision is brought to life exactly as you imagined.',
  },
  {
    id: 6,
    question: 'Do you offer an affiliate or revenue-sharing program?',
    answer:
      'Yes! Join our affiliate network and earn revenue by promoting TechnoAI. You’ll get a custom dashboard to track leads, commissions, and payouts in real time.',
  },
];

export const technoServices: TechnoService[] = [
  {
    title: "AI Tools",
    img: '/techai/ai-tool.svg',
    desc: "Leverage cutting-edge AI tools to automate tasks, gain insights, and boost productivity across your digital ecosystem."
  },
  {
    title: "Mobile Application",
    img: '/techai/mob-app.svg',
    desc: "Build sleek, user-friendly mobile apps that deliver seamless experiences on both iOS and Android platforms."
  },
  {
    title: "Web Development",
    img: '/techai/web-dev.svg',
    desc: "Design and develop responsive, high-performance websites tailored to your brand and business goals."
  },
  {
    title: "Hosting",
    img: '/techai/hosting.svg',
    desc: "Fast, secure, and scalable hosting solutions to keep your websites and apps running smoothly 24/7."
  },
  {
    title: "Digital Marketing",
    img: '/techai/digital-marketing.svg',
    desc: "Drive traffic and boost conversions with targeted digital campaigns, content strategies, and social media engagement."
  },
  {
    title: "SEO",
    img: '/techai/seo.svg',
    desc: "Optimize your online presence with proven SEO techniques to rank higher, reach more customers, and grow organically."
  }
]


export const strategicServices: strategicServices[] = [
  {
    title: "Purpose and Message",
    img: '/main/target.svg',
    desc: "Clearly define the goal of the animation and the core message it aims to communicate, ensuring a focused and impactful visual story."
  },
  {
    title: "Design and Animation",
    img: '/main/design-thinking.svg',
    desc: "Create visually appealing elements in line with brand aesthetics, utilizing animation techniques to tell a cohesive and visually captivating story."
  },
  {
    title: "Scripting and Voiceover",
    img: '/main/audio-waves.svg',
    desc: "Craft a compelling script and choose a suitable voice to align with the animation's purpose, enhancing engagement and resonance with the target audience."
  },
  {
    title: "Storyboarding",
    img: '/main/story-board.svg',
    desc: "Develop a visual roadmap through storyboarding, outlining the sequence of scenes and key events to guide the animation's flow and narrative."
  },
  {
    title: "Sound and Music",
    img: '/main/guitar.svg',
    desc: "Integrate impactful sound effects and background music to enhance the viewer's experience, setting the mood and reinforcing key points in the animation."
  },
  {
    title: "Testing and Refinement",
    img: '/main/testing.svg',
    desc: "Conduct thorough testing, gathering feedback to refine the animation for a polished final product, ensuring it meets both quality standards and the intended message."
  },
]