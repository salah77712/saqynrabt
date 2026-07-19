'use client';

import * as React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Globe, Clock, DollarSign, Package } from 'lucide-react';

const steps = {
  en: [
    { step: '01', title: 'Book a Discovery Call', desc: 'Schedule a 15-minute call with our team. We learn about your operations, pain points, and goals.' },
    { step: '02', title: 'We Configure Your Workspace', desc: 'Our team sets up your department routing rules, voice scripts, knowledge base, and integrations. No effort required from you.' },
    { step: '03', title: 'Team Training (1 Hour)', desc: 'We walk your team through the dashboard, answer questions, and ensure everyone is comfortable with the system.' },
    { step: '04', title: 'Go Live', desc: 'Within 5â€“7 business days, your AI front-desk is operational. We monitor the first 48 hours to catch any edge cases.' },
    { step: '05', title: 'Ongoing Optimization', desc: 'We review transcripts, update your knowledge base, and refine routing rules monthly. Your system gets smarter over time.' },
  ],
  ar: [
    { step: '01', title: 'Ø§Ø­Ø¬Ø² Ù…ÙƒØ§Ù„Ù…Ø© Ø§ÙƒØªØ´Ø§Ù', desc: 'Ø§Ø­Ø¬Ø² Ù…ÙƒØ§Ù„Ù…Ø© Ù…Ø¯ØªÙ‡Ø§ 15 Ø¯Ù‚ÙŠÙ‚Ø© Ù…Ø¹ ÙØ±ÙŠÙ‚Ù†Ø§. Ù†ØªØ¹Ø±Ù Ø¹Ù„Ù‰ Ø¹Ù…Ù„ÙŠØ§ØªÙƒ ÙˆÙ†Ù‚Ø§Ø· Ø§Ù„Ø£Ù„Ù… ÙˆØ£Ù‡Ø¯Ø§ÙÙƒ.' },
    { step: '02', title: 'Ù†Ù‚ÙˆÙ… Ø¨ØªÙƒÙˆÙŠÙ† Ù…Ø³Ø§Ø­Ø© Ø¹Ù…Ù„Ùƒ', desc: 'ÙØ±ÙŠÙ‚Ù†Ø§ ÙŠØ¶Ø¨Ø· Ù‚ÙˆØ§Ø¹Ø¯ ØªÙˆØ¬ÙŠÙ‡ Ø§Ù„Ø£Ù‚Ø³Ø§Ù… ÙˆØ§Ù„Ù†ØµÙˆØµ Ø§Ù„ØµÙˆØªÙŠØ© ÙˆÙ‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ù…Ø¹Ø±ÙØ© ÙˆØ§Ù„ØªÙƒØ§Ù…Ù„Ø§Øª. Ù„Ø§ Ø¬Ù‡Ø¯ Ù…Ø·Ù„ÙˆØ¨ Ù…Ù†Ùƒ.' },
    { step: '03', title: 'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„ÙØ±ÙŠÙ‚ (Ø³Ø§Ø¹Ø© ÙˆØ§Ø­Ø¯Ø©)', desc: 'Ù†Ø±Ø´Ø¯ ÙØ±ÙŠÙ‚Ùƒ Ø®Ù„Ø§Ù„ Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ… ÙˆÙ†Ø¬ÙŠØ¨ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ø³Ø¦Ù„Ø© ÙˆÙ†ØªØ£ÙƒØ¯ Ù…Ù† Ø±Ø§Ø­Ø© Ø§Ù„Ø¬Ù…ÙŠØ¹ Ù…Ø¹ Ø§Ù„Ù†Ø¸Ø§Ù….' },
    { step: '04', title: 'Ø¨Ø¯Ø¡ Ø§Ù„ØªØ´ØºÙŠÙ„', desc: 'Ø®Ù„Ø§Ù„ 5-7 Ø£ÙŠØ§Ù… Ø¹Ù…Ù„ØŒ ÙŠØµØ¨Ø­ Ù…ÙƒØªØ¨ Ø§Ù„Ø§Ø³ØªÙ‚Ø¨Ø§Ù„ Ø§Ù„Ø°ÙƒÙŠ Ø¬Ø§Ù‡Ø²Ø§Ù‹. Ù†Ø±Ø§Ù‚Ø¨ Ø£ÙˆÙ„ 48 Ø³Ø§Ø¹Ø© Ù„Ø§Ù„ØªÙ‚Ø§Ø· Ø£ÙŠ Ø­Ø§Ù„Ø§Øª Ø§Ø³ØªØ«Ù†Ø§Ø¦ÙŠØ©.' },
    { step: '05', title: 'ØªØ­Ø³ÙŠÙ† Ù…Ø³ØªÙ…Ø±', desc: 'Ù†Ø±Ø§Ø¬Ø¹ Ø§Ù„Ù†ØµÙˆØµ ÙˆÙ†Ø­Ø¯Ø« Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ù…Ø¹Ø±ÙØ© ÙˆÙ†Ø­Ø³Ù† Ù‚ÙˆØ§Ø¹Ø¯ Ø§Ù„ØªÙˆØ¬ÙŠÙ‡ Ø´Ù‡Ø±ÙŠØ§Ù‹. Ù†Ø¸Ø§Ù…Ùƒ ÙŠØµØ¨Ø­ Ø£Ø°ÙƒÙ‰ Ø¨Ù…Ø±ÙˆØ± Ø§Ù„ÙˆÙ‚Øª.' },
  ],
  fr: [
    { step: '01', title: 'RÃ©server un appel de dÃ©couverte', desc: 'Planifiez un appel de 15 minutes avec notre Ã©quipe. Nous en apprenons plus sur vos opÃ©rations, vos points faibles et vos objectifs.' },
    { step: '02', title: 'Nous configurons votre espace de travail', desc: 'Notre Ã©quipe configure vos rÃ¨gles de routage de service, vos scripts vocaux, votre base de connaissances et vos intÃ©grations. Aucun effort requis de votre part.' },
    { step: '03', title: 'Formation de l\'Ã©quipe (1 heure)', desc: 'We walk your team through the dashboard, answer questions, and ensure everyone is comfortable with the system.' },
    { step: '04', title: 'Mise en service', desc: 'Sous 5 Ã  7 jours ouvrables, votre accueil IA est opÃ©rationnel. Nous surveillons les premiÃ¨res 48 heures pour dÃ©tecter tout cas particulier.' },
    { step: '05', title: 'Optimisation continue', desc: 'Nous examinons les transcriptions, mettons Ã  jour votre base de connaissances et affinons les rÃ¨gles de routage mensuellement. Votre systÃ¨me devient plus intelligent avec le temps.' },
  ],
  hi: [
    { step: '01', title: 'à¤¡à¤¿à¤¸à¥à¤•à¤µà¤°à¥€ à¤•à¥‰à¤² à¤¬à¥à¤• à¤•à¤°à¥‡à¤‚', desc: 'à¤¹à¤®à¤¾à¤°à¥€ à¤Ÿà¥€à¤® à¤•à¥‡ à¤¸à¤¾à¤¥ 15 à¤®à¤¿à¤¨à¤Ÿ à¤•à¥€ à¤•à¥‰à¤² à¤¶à¥‡à¤¡à¥à¤¯à¥‚à¤² à¤•à¤°à¥‡à¤‚à¥¤ à¤¹à¤® à¤†à¤ªà¤•à¥‡ à¤¸à¤‚à¤šà¤¾à¤²à¤¨, à¤¸à¤®à¤¸à¥à¤¯à¤¾à¤“à¤‚ à¤”à¤° à¤²à¤•à¥à¤·à¥à¤¯à¥‹à¤‚ à¤•à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚ à¤¸à¥€à¤–à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤' },
    { step: '02', title: 'à¤¹à¤® à¤†à¤ªà¤•à¤¾ à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤•à¥‰à¤¨à¥à¤«à¤¼à¤¿à¤—à¤° à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚', desc: 'à¤¹à¤®à¤¾à¤°à¥€ à¤Ÿà¥€à¤® à¤†à¤ªà¤•à¥‡ à¤µà¤¿à¤­à¤¾à¤— à¤°à¥‚à¤Ÿà¤¿à¤‚à¤— à¤¨à¤¿à¤¯à¤®, à¤µà¥‰à¤¯à¤¸ à¤¸à¥à¤•à¥à¤°à¤¿à¤ªà¥à¤Ÿ, à¤œà¥à¤žà¤¾à¤¨ à¤†à¤§à¤¾à¤° à¤”à¤° à¤à¤•à¥€à¤•à¤°à¤£ à¤¸à¥‡à¤Ÿ à¤•à¤°à¤¤à¥€ à¤¹à¥ˆà¥¤ à¤†à¤ªà¤•à¥€ à¤“à¤° à¤¸à¥‡ à¤•à¤¿à¤¸à¥€ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤•à¥€ à¤†à¤µà¤¶à¥à¤¯à¤•à¤¤à¤¾ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤' },
    { step: '03', title: 'à¤Ÿà¥€à¤® à¤ªà¥à¤°à¤¶à¤¿à¤•à¥à¤·à¤£ (1 à¤˜à¤‚à¤Ÿà¤¾)', desc: 'à¤¹à¤® à¤†à¤ªà¤•à¥€ à¤Ÿà¥€à¤® à¤•à¥‹ à¤¡à¥ˆà¤¶à¤¬à¥‹à¤°à¥à¤¡ à¤•à¥‡ à¤®à¤¾à¤§à¥à¤¯à¤® à¤¸à¥‡ à¤®à¤¾à¤°à¥à¤—à¤¦à¤°à¥à¤¶à¤¨ à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤¸à¤µà¤¾à¤²à¥‹à¤‚ à¤•à¥‡ à¤œà¤µà¤¾à¤¬ à¤¦à¥‡à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤”à¤° à¤¸à¥à¤¨à¤¿à¤¶à¥à¤šà¤¿à¤¤ à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚ à¤•à¤¿ à¤¹à¤° à¤•à¥‹à¤ˆ à¤¸à¤¿à¤¸à¥à¤Ÿà¤® à¤•à¥‡ à¤¸à¤¾à¤¥ à¤¸à¤¹à¤œ à¤¹à¥ˆà¥¤' },
    { step: '04', title: 'à¤²à¤¾à¤‡à¤µ à¤œà¤¾à¤à¤‚', desc: '5-7 à¤µà¥à¤¯à¤¾à¤µà¤¸à¤¾à¤¯à¤¿à¤• à¤¦à¤¿à¤¨à¥‹à¤‚ à¤•à¥‡ à¤­à¥€à¤¤à¤°, à¤†à¤ªà¤•à¤¾ à¤à¤†à¤ˆ à¤«à¥à¤°à¤‚à¤Ÿ-à¤¡à¥‡à¤¸à¥à¤• à¤šà¤¾à¤²à¥‚ à¤¹à¥‹ à¤œà¤¾à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤¹à¤® à¤•à¤¿à¤¸à¥€ à¤­à¥€ à¤µà¤¿à¤·à¤® à¤ªà¤°à¤¿à¤¸à¥à¤¥à¤¿à¤¤à¤¿ à¤•à¥‹ à¤ªà¤•à¤¡à¤¼à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤ªà¤¹à¤²à¥‡ 48 à¤˜à¤‚à¤Ÿà¥‹à¤‚ à¤•à¥€ à¤¨à¤¿à¤—à¤°à¤¾à¤¨à¥€ à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤' },
    { step: '05', title: 'à¤¨à¤¿à¤°à¤‚à¤¤à¤° à¤…à¤¨à¥à¤•à¥‚à¤²à¤¨', desc: 'à¤¹à¤® à¤Ÿà¥à¤°à¤¾à¤‚à¤¸à¤•à¥à¤°à¤¿à¤ªà¥à¤Ÿ à¤•à¥€ à¤¸à¤®à¥€à¤•à¥à¤·à¤¾ à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤†à¤ªà¤•à¥‡ à¤œà¥à¤žà¤¾à¤¨ à¤†à¤§à¤¾à¤° à¤•à¥‹ à¤…à¤ªà¤¡à¥‡à¤Ÿ à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤”à¤° à¤®à¤¾à¤¸à¤¿à¤• à¤°à¥‚à¤ª à¤¸à¥‡ à¤°à¥‚à¤Ÿà¤¿à¤‚à¤— à¤¨à¤¿à¤¯à¤®à¥‹à¤‚ à¤•à¥‹ à¤ªà¤°à¤¿à¤·à¥à¤•à¥ƒà¤¤ à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤ à¤†à¤ªà¤•à¤¾ à¤¸à¤¿à¤¸à¥à¤Ÿà¤® à¤¸à¤®à¤¯ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤¹à¥‹à¤¤à¤¾ à¤œà¤¾à¤¤à¤¾ à¤¹à¥ˆà¥¤' },
  ]
};

const flagIcons: Record<string, React.ReactNode> = {
  globe: <Globe className="w-8 h-8 text-primary" />,
  clock: <Clock className="w-8 h-8 text-primary" />,
  language: <Globe className="w-8 h-8 text-primary" />,
  currency: <DollarSign className="w-8 h-8 text-primary" />,
  data: <Package className="w-8 h-8 text-primary" />,
};

const globalItems = {
  en: [
    { flag: 'qa', title: 'Qatar', desc: 'Doha â€” Regional operations hub.' },
    { flag: 'sa', title: 'Saudi Arabia', desc: 'Riyadh â€” Corporate offices.' },
    { flag: 'ae', title: 'United Arab Emirates', desc: 'Dubai â€” Enterprise clients.' },
    { flag: 'ke', title: 'Kenya', desc: 'Nairobi â€” East Africa hub.' },
    { flag: 'uk', title: 'United Kingdom', desc: 'London â€” Western Europe office.' },
    { flag: 'us', title: 'United States', desc: 'New York â€” Americas operation.' },
  ],
  ar: [
    { flag: 'qa', title: 'Ù‚Ø·Ø±', desc: 'Ø§Ù„Ø¯ÙˆØ­Ø© â€” Ù…Ø±ÙƒØ² Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø¥Ù‚Ù„ÙŠÙ…ÙŠ.' },
    { flag: 'sa', title: 'Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©', desc: 'Ø§Ù„Ø±ÙŠØ§Ø¶ â€” Ø§Ù„Ù…ÙƒØ§ØªØ¨ Ø§Ù„Ù…Ø¤Ø³Ø³ÙŠØ©.' },
    { flag: 'ae', title: 'Ø§Ù„Ø¥Ù…Ø§Ø±Ø§Øª Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ù…ØªØ­Ø¯Ø©', desc: 'Ø¯Ø¨ÙŠ â€” Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„Ù…Ø¤Ø³Ø³Ø§Øª.' },
    { flag: 'ke', title: 'ÙƒÙŠÙ†ÙŠØ§', desc: 'Ù†ÙŠØ±ÙˆØ¨ÙŠ â€” Ù…Ø±ÙƒØ² Ø´Ø±Ù‚ Ø¥ÙØ±ÙŠÙ‚ÙŠØ§.' },
    { flag: 'uk', title: 'Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ù…ØªØ­Ø¯Ø©', desc: 'Ù„Ù†Ø¯Ù† â€” Ù…ÙƒØªØ¨ ØºØ±Ø¨ Ø£ÙˆØ±ÙˆØ¨Ø§.' },
    { flag: 'us', title: 'Ø§Ù„ÙˆÙ„Ø§ÙŠØ§Øª Ø§Ù„Ù…ØªØ­Ø¯Ø©', desc: 'Ù†ÙŠÙˆÙŠÙˆØ±Ùƒ â€” Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø£Ù…Ø±ÙŠÙƒØªÙŠÙ†.' },
  ],
  fr: [
    { flag: 'qa', title: 'Qatar', desc: 'Doha â€” Hub des opÃ©rations rÃ©gionales.' },
    { flag: 'sa', title: 'Arabie Saoudite', desc: 'Riyad â€” Bureaux d\'entreprise.' },
    { flag: 'ae', title: 'Ã‰mirats Arabes Unis', desc: 'DubaÃ¯ â€” Clients d\'entreprise.' },
    { flag: 'ke', title: 'Kenya', desc: 'Nairobi â€” Hub d\'Afrique de l\'Est.' },
    { flag: 'uk', title: 'Royaume-Uni', desc: 'Londres â€” Bureau d\'Europe occidentale.' },
    { flag: 'us', title: 'Ã‰tats-Unis', desc: 'New York â€” OpÃ©rations des AmÃ©riques.' },
  ],
  hi: [
    { flag: 'qa', title: 'à¤•à¤¤à¤°', desc: 'à¤¦à¥‹à¤¹à¤¾ â€” à¤•à¥à¤·à¥‡à¤¤à¥à¤°à¥€à¤¯ à¤¸à¤‚à¤šà¤¾à¤²à¤¨ à¤•à¥‡à¤‚à¤¦à¥à¤°à¥¤' },
    { flag: 'sa', title: 'à¤¸à¤Šà¤¦à¥€ à¤…à¤°à¤¬', desc: 'à¤°à¤¿à¤¯à¤¾à¤¦ â€” à¤•à¥‰à¤°à¥à¤ªà¥‹à¤°à¥‡à¤Ÿ à¤•à¤¾à¤°à¥à¤¯à¤¾à¤²à¤¯à¥¤' },
    { flag: 'ae', title: 'à¤¸à¤‚à¤¯à¥à¤•à¥à¤¤ à¤…à¤°à¤¬ à¤…à¤®à¥€à¤°à¤¾à¤¤', desc: 'à¤¦à¥à¤¬à¤ˆ â€” à¤‰à¤¦à¥à¤¯à¤® à¤—à¥à¤°à¤¾à¤¹à¤•à¥¤' },
    { flag: 'ke', title: 'à¤•à¥‡à¤¨à¥à¤¯à¤¾', desc: 'à¤¨à¥ˆà¤°à¥‹à¤¬à¥€ â€” à¤ªà¥‚à¤°à¥à¤µà¥€ à¤…à¤«à¥à¤°à¥€à¤•à¤¾ à¤¹à¤¬à¥¤' },
    { flag: 'uk', title: 'à¤¯à¥‚à¤¨à¤¾à¤‡à¤Ÿà¥‡à¤¡ à¤•à¤¿à¤‚à¤—à¤¡à¤®', desc: 'à¤²à¤‚à¤¦à¤¨ â€” à¤ªà¤¶à¥à¤šà¤¿à¤®à¥€ à¤¯à¥‚à¤°à¥‹à¤ª à¤•à¤¾à¤°à¥à¤¯à¤¾à¤²à¤¯à¥¤' },
    { flag: 'us', title: 'à¤¸à¤‚à¤¯à¥à¤•à¥à¤¤ à¤°à¤¾à¤œà¥à¤¯ à¤…à¤®à¥‡à¤°à¤¿à¤•à¤¾', desc: 'à¤¨à¥à¤¯à¥‚à¤¯à¥‹à¤°à¥à¤• â€” à¤…à¤®à¥‡à¤°à¤¿à¤•à¤¾ à¤¸à¤‚à¤šà¤¾à¤²à¤¨à¥¤' },
  ]
};



export default function HowItWorksPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const stepList = steps[locale as keyof typeof steps] || steps.en;
  const global = globalItems[locale as keyof typeof globalItems] || globalItems.en;

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'How It Works', fr: 'Comment Ã§a marche', ar: 'ÙƒÙŠÙ ÙŠØ¹Ù…Ù„', hi: 'à¤¯à¤¹ à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          {t({ en: 'From your first call to go-live in under a week', fr: 'De votre premier appel Ã  la mise en ligne en moins d\'une semaine', ar: 'Ù…Ù† Ø£ÙˆÙ„ Ù…ÙƒØ§Ù„Ù…Ø© Ø¥Ù„Ù‰ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„ÙØ¹Ù„ÙŠ ÙÙŠ Ø£Ù‚Ù„ Ù…Ù† Ø£Ø³Ø¨ÙˆØ¹', hi: 'à¤†à¤ªà¤•à¥‡ à¤ªà¤¹à¤²à¥‡ à¤•à¥‰à¤² à¤¸à¥‡ à¤²à¥‡à¤•à¤° à¤à¤• à¤¸à¤ªà¥à¤¤à¤¾à¤¹ à¤¸à¥‡ à¤­à¥€ à¤•à¤® à¤¸à¤®à¤¯ à¤®à¥‡à¤‚ à¤²à¤¾à¤‡à¤µ à¤¹à¥‹à¤¨à¥‡ à¤¤à¤•' })}
        </h1>
        <p className="mt-4 text-lg text-primary max-w-2xl mx-auto">
          {t({ en: 'Quick setup, minimal training, immediate results â€” anywhere you operate.', fr: 'Configuration rapide, formation minimale, rÃ©sultats immÃ©diats â€” partout oÃ¹ vous opÃ©rez.', ar: 'Ø¥Ø¹Ø¯Ø§Ø¯ Ø³Ø±ÙŠØ¹ØŒ ØªØ¯Ø±ÙŠØ¨ Ø¨Ø³ÙŠØ·ØŒ Ù†ØªØ§Ø¦Ø¬ ÙÙˆØ±ÙŠØ© â€” Ø£ÙŠÙ†Ù…Ø§ ÙƒÙ†Øª.', hi: 'à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤¸à¥‡à¤Ÿà¤…à¤ª, à¤¨à¥à¤¯à¥‚à¤¨à¤¤à¤® à¤ªà¥à¤°à¤¶à¤¿à¤•à¥à¤·à¤£, à¤¤à¤¤à¥à¤•à¤¾à¤² à¤ªà¤°à¤¿à¤£à¤¾à¤® â€” à¤†à¤ª à¤œà¤¹à¤¾à¤‚ à¤­à¥€ à¤•à¤¾à¤® à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤' })}
        </p>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            {stepList.map((s) => (
              <div key={s.step} className="flex items-start gap-8 bg-background border border-primary/10 rounded-xl p-8 shadow-sm shadow-card">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-surface">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-1">{s.title}</h3>
                  <p className="text-primary leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t({ en: 'Global by Design', fr: 'Global par conception', ar: 'Ø¹Ø§Ù„Ù…ÙŠ Ø¨Ø§Ù„ØªØµÙ…ÙŠÙ…', hi: 'à¤¡à¤¿à¤œà¤¼à¤¾à¤‡à¤¨ à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤µà¥ˆà¤¶à¥à¤µà¤¿à¤•' })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {global.map((g) => (
              <div key={g.title} className="border border-primary/10 rounded-xl p-8 shadow-sm">
                <span className="text-3xl mb-3 block">{flagIcons[g.flag] || <Globe className="w-8 h-8 text-primary" />}</span>
                <h3 className="text-lg font-bold text-primary mb-2">{g.title}</h3>
                <p className="text-sm text-primary leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-surface">
          <h2 className="text-3xl font-bold mb-4">
            {t({ en: 'Start Your Journey Today', fr: 'Commencez votre voyage aujourd\'hui', ar: 'Ø§Ø¨Ø¯Ø£ Ø±Ø­Ù„ØªÙƒ Ø§Ù„ÙŠÙˆÙ…', hi: 'à¤†à¤œ à¤¹à¥€ à¤…à¤ªà¤¨à¥€ à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‡à¤‚' })}
          </h2>
          <p className="text-surface mb-8">
            {t({ en: 'Let\'s build your AI operations â€” wherever you are.', fr: 'Construisons vos opÃ©rations d\'IA â€” oÃ¹ que vous soyez.', ar: 'Ø¯Ø¹Ù†Ø§ Ù†Ø¨Ù†ÙŠ Ø¹Ù…Ù„ÙŠØ§ØªÙƒ Ø§Ù„Ø°ÙƒÙŠØ© â€” Ø£ÙŠÙ†Ù…Ø§ ÙƒÙ†Øª.', hi: 'à¤†à¤‡à¤ à¤†à¤ªà¤•à¥‡ à¤à¤†à¤ˆ à¤¸à¤‚à¤šà¤¾à¤²à¤¨ à¤•à¤¾ à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£ à¤•à¤°à¥‡à¤‚ â€” à¤†à¤ª à¤œà¤¹à¤¾à¤‚ à¤­à¥€ à¤¹à¥‹à¤‚à¥¤' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-surface text-primary px-6 py-3 text-xs font-bold min-h-[44px] hover:opacity-90 transition-all"
          >
            {t({ en: 'See how it works', fr: 'DÃ©couvrez comment Ã§a marche', ar: 'Ø´Ø§Ù‡Ø¯ ÙƒÙŠÙ ÙŠØ¹Ù…Ù„', hi: 'à¤¦à¥‡à¤–à¥‡à¤‚ à¤¯à¤¹ à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
