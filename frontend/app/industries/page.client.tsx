'use client';

import * as React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Building2, HeartPulse, Wrench, Car, Utensils, Ambulance, DollarSign, Bell, Flag, Construction, Scale, BarChart3, ShoppingBag } from 'lucide-react';

const industryIcons: Record<string, React.ReactNode> = {
  hospitality: <Building2 className="w-8 h-8 text-primary" />,
  healthcare: <HeartPulse className="w-8 h-8 text-primary" />,
  homeServices: <Wrench className="w-8 h-8 text-primary" />,
  realEstate: <Building2 className="w-8 h-8 text-primary" />,
  automotive: <Car className="w-8 h-8 text-primary" />,
  food: <Utensils className="w-8 h-8 text-primary" />,
  towing: <Ambulance className="w-8 h-8 text-primary" />,
  veterinary: <HeartPulse className="w-8 h-8 text-primary" />,
  plumbing: <DollarSign className="w-8 h-8 text-primary" />,
  boutique: <Bell className="w-8 h-8 text-primary" />,
  catering: <Utensils className="w-8 h-8 text-primary" />,
  dealerships: <Flag className="w-8 h-8 text-primary" />,
  construction: <Construction className="w-8 h-8 text-primary" />,
  law: <Scale className="w-8 h-8 text-primary" />,
  accounting: <BarChart3 className="w-8 h-8 text-primary" />,
  retail: <ShoppingBag className="w-8 h-8 text-primary" />,
};

const industries = {
  en: [
    { icon: 'hospitality', title: 'Hospitality', desc: 'Hotels, resorts, and boutique properties use SAQYN RABT to handle late check-ins, room service requests, and guest complaints 24/7.' },
    { icon: 'healthcare', title: 'Healthcare', desc: 'Clinics and hospitals automate patient bookings, triage emergencies, and route inquiries to the right department instantly.' },
    { icon: 'homeServices', title: 'Home Services', desc: 'Plumbers, electricians, and HVAC companies capture emergency calls after hours and dispatch technicians immediately.' },
    { icon: 'realEstate', title: 'Real Estate', desc: 'Property managers route maintenance requests to on-site crews and handle tenant inquiries without a receptionist.' },
    { icon: 'automotive', title: 'Automotive', desc: 'Dealerships and repair shops automate service bookings, inventory inquiries, and quote requests around the clock.' },
    { icon: 'food', title: 'Food & Beverage', desc: 'Restaurants, cafes, and catering services book reservations and takeout orders during peak hours without missed calls.' },
    { icon: 'towing', title: 'Towing & Roadside', desc: 'Capture stranded drivers, get GPS data, and dispatch the nearest truck without a phone call.' },
    { icon: 'veterinary', title: 'Veterinary', desc: 'Triage emergency pet visits and route urgent cases to the on-call nurse immediately.' },
    { icon: 'plumbing', title: 'Plumbing & HVAC', desc: 'Stop losing money from missed after-hours repair calls. Capture every lead and dispatch your field team.' },
    { icon: 'boutique', title: 'Boutique Hotels', desc: 'Let guests au digital door codes at midnight. Handle late arrivals without front-desk staff.' },
    { icon: 'catering', title: 'Restaurants & Catering', desc: 'Quote and book catering orders with no phone tag. Standardize large event bookings.' },
    { icon: 'dealerships', title: 'Auto Dealerships', desc: 'Answer real-time inventory questions about used cars on your lot â€”  even after hours.' },
    { icon: 'construction', title: 'Construction', desc: 'Keep subcontractors updated on material delivery times and site work permits without manual calls.' },
    { icon: 'law', title: 'Law Firms', desc: 'Au retainer fee questions and intake form inquiries. Free up paralegals for billable work.' },
    { icon: 'accounting', title: 'Accounting & Tax', desc: 'Handle tax season refund status checks without a receptionist. Route complex cases to senior accountants.' },
    { icon: 'retail', title: 'Retail & E-commerce', desc: 'Answer product questions, process returns, and handle customer inquiries across every channel.' },
  ],
  ar: [
    { icon: 'hospitality', title: 'Ø§Ù„Ø¶ÙŠØ§ÙØ©', desc: 'ØªØ³ØªØ®Ø¯Ù… Ø§Ù„ÙÙ†Ø§Ø¯Ù‚ ÙˆØ§Ù„Ù…Ù†ØªØ¬Ø¹Ø§Øª SAQYN RABT Ù„Ù„ØªØ¹Ø§Ù…Ù„ Ù…Ø¹ ØªØ³Ø¬ÙŠÙ„Ø§Øª Ø§Ù„ÙˆØµÙˆÙ„ Ø§Ù„Ù…ØªØ£Ø®Ø±Ø© ÙˆØ·Ù„Ø¨Ø§Øª Ø§Ù„ØºØ±Ù ÙˆØ´ÙƒØ§ÙˆÙ‰ Ø§Ù„Ø¶ÙŠÙˆÙ 24/7.' },
    { icon: 'healthcare', title: 'Ø§Ù„Ø±Ø¹Ø§ÙŠØ© Ø§Ù„ØµØ­ÙŠØ©', desc: 'ØªØ¤ØªÙ…Øª Ø§Ù„Ø¹ÙŠØ§Ø¯Ø§Øª ÙˆØ§Ù„Ù…Ø³ØªØ´ÙÙŠØ§Øª Ø­Ø¬ÙˆØ²Ø§Øª Ø§Ù„Ù…Ø±Ø¶Ù‰ ÙˆÙØ±Ø² Ø§Ù„Ø­Ø§Ù„Ø§Øª Ø§Ù„Ø·Ø§Ø±Ø¦Ø© ÙˆØªÙˆØ¬ÙŠÙ‡ Ø§Ù„Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ù„Ù„Ù‚Ø³Ù… Ø§Ù„Ù…Ù†Ø§Ø³Ø¨ ÙÙˆØ±Ø§Ù‹.' },
    { icon: 'homeServices', title: 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…Ù†Ø²Ù„ÙŠØ©', desc: 'ÙŠÙ„ØªÙ‚Ø· Ø§Ù„Ø³Ø¨Ø§ÙƒÙˆÙ† ÙˆØ§Ù„ÙƒÙ‡Ø±Ø¨Ø§Ø¦ÙŠÙˆÙ† Ù…ÙƒØ§Ù„Ù…Ø§Øª Ø§Ù„Ø·ÙˆØ§Ø±Ø¦ Ø¨Ø¹Ø¯ Ø³Ø§Ø¹Ø§Øª Ø§Ù„Ø¹Ù…Ù„ ÙˆÙŠØ±Ø³Ù„ÙˆÙ† Ø§Ù„ÙÙ†ÙŠÙŠÙ† ÙÙˆØ±Ø§Ù‹.' },
    { icon: 'realEstate', title: 'Ø§Ù„Ø¹Ù‚Ø§Ø±Ø§Øª', desc: 'ÙŠÙˆØ¬Ù‡ Ù…Ø¯ÙŠØ±Ùˆ Ø§Ù„Ø¹Ù‚Ø§Ø±Ø§Øª Ø·Ù„Ø¨Ø§Øª Ø§Ù„ØµÙŠØ§Ù†Ø© Ù„ÙØ±Ù‚ Ø§Ù„Ø¹Ù…Ù„ ÙˆÙŠØªØ¹Ø§Ù…Ù„ÙˆÙ† Ù…Ø¹ Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§Ù„Ù…Ø³ØªØ£Ø¬Ø±ÙŠÙ† Ø¯ÙˆÙ† Ù…ÙˆØ¸Ù Ø§Ø³ØªÙ‚Ø¨Ø§Ù„.' },
    { icon: 'automotive', title: 'Ø§Ù„Ø³ÙŠØ§Ø±Ø§Øª', desc: 'ØªØ¤ØªÙ…Øª Ø§Ù„ÙˆÙƒØ§Ù„Ø§Øª ÙˆÙˆØ±Ø´ Ø§Ù„Ø¥ØµÙ„Ø§Ø­ Ø­Ø¬ÙˆØ²Ø§Øª Ø§Ù„Ø®Ø¯Ù…Ø© ÙˆØ§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§Ù„Ù…Ø®Ø²ÙˆÙ† ÙˆØ·Ù„Ø¨Ø§Øª Ø¹Ø±ÙˆØ¶ Ø§Ù„Ø£Ø³Ø¹Ø§Ø± Ø¹Ù„Ù‰ Ù…Ø¯Ø§Ø± Ø§Ù„Ø³Ø§Ø¹Ø©.' },
    { icon: 'food', title: 'Ø§Ù„Ø£ØºØ°ÙŠØ© ÙˆØ§Ù„Ù…Ø´Ø±ÙˆØ¨Ø§Øª', desc: 'ØªØ­Ø¬Ø² Ø§Ù„Ù…Ø·Ø§Ø¹Ù… ÙˆØ§Ù„Ù…Ù‚Ø§Ù‡ÙŠ ÙˆØ®Ø¯Ù…Ø§Øª Ø§Ù„ØªÙ…ÙˆÙŠÙ† Ø§Ù„Ø·Ù„Ø¨Ø§Øª Ø®Ù„Ø§Ù„ Ø³Ø§Ø¹Ø§Øª Ø§Ù„Ø°Ø±ÙˆØ© Ø¯ÙˆÙ† Ù…ÙƒØ§Ù„Ù…Ø§Øª ÙØ§Ø¦ØªØ©.' },
    { icon: 'towing', title: 'Ø§Ù„Ø³Ø­Ø¨ ÙˆØ§Ù„Ø®Ø¯Ù…Ø§Øª Ø¹Ù„Ù‰ Ø§Ù„Ø·Ø±ÙŠÙ‚', desc: 'Ø§Ù„ØªÙ‚Ø· Ø§Ù„Ø³Ø§Ø¦Ù‚ÙŠÙ† Ø§Ù„Ø¹Ø§Ù„Ù‚ÙŠÙ† ÙˆØ§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…ÙˆÙ‚Ø¹ GPS ÙˆØ£Ø±Ø³Ù„ Ø£Ù‚Ø±Ø¨ Ø´Ø§Ø­Ù†Ø© Ø¯ÙˆÙ† Ù…ÙƒØ§Ù„Ù…Ø© Ù‡Ø§ØªÙÙŠØ©.' },
    { icon: 'veterinary', title: 'Ø§Ù„Ø·Ø¨ Ø§Ù„Ø¨ÙŠØ·Ø±ÙŠ', desc: 'Ø§ÙØ±Ø² Ø²ÙŠØ§Ø±Ø§Øª Ø§Ù„Ø­ÙŠÙˆØ§Ù†Ø§Øª Ø§Ù„Ø£Ù„ÙŠÙØ© Ø§Ù„Ø·Ø§Ø±Ø¦Ø© ÙˆÙˆØ¬Ù‘Ù‡ Ø§Ù„Ø­Ø§Ù„Ø§Øª Ø§Ù„Ø¹Ø§Ø¬Ù„Ø© Ù„Ù„Ù…Ù…Ø±Ø¶ Ø§Ù„Ù…Ù†Ø§ÙˆØ¨ ÙÙˆØ±Ø§Ù‹.' },
    { icon: 'plumbing', title: 'Ø§Ù„Ø³Ø¨Ø§ÙƒØ© ÙˆØ§Ù„ØªØ¯ÙØ¦Ø© ÙˆØ§Ù„ØªÙƒÙŠÙŠÙ', desc: 'ØªÙˆÙ‚Ù Ø¹Ù† Ø®Ø³Ø§Ø±Ø© Ø§Ù„Ø£Ù…ÙˆØ§Ù„ Ù…Ù† Ù…ÙƒØ§Ù„Ù…Ø§Øª Ø§Ù„Ø¥ØµÙ„Ø§Ø­ Ø§Ù„ÙØ§Ø¦ØªØ© Ø¨Ø¹Ø¯ Ø³Ø§Ø¹Ø§Øª Ø§Ù„Ø¹Ù…Ù„. Ø§Ù„ØªÙ‚Ø· ÙƒÙ„ ÙØ±ØµØ© ÙˆØ£Ø±Ø³Ù„ ÙØ±ÙŠÙ‚Ùƒ Ø§Ù„Ù…ÙŠØ¯Ø§Ù†ÙŠ.' },
    { icon: 'boutique', title: 'Ø§Ù„ÙÙ†Ø§Ø¯Ù‚ Ø§Ù„Ø¨ÙˆØªÙŠÙƒÙŠØ©', desc: 'Ø¯Ø¹ Ø§Ù„Ø¶ÙŠÙˆÙ ÙŠØ®ØµØµÙˆÙ† Ø±Ù…ÙˆØ² Ø§Ù„Ø£Ø¨ÙˆØ§Ø¨ Ø§Ù„Ø±Ù‚Ù…ÙŠØ© ÙÙŠ Ù…Ù†ØªØµÙ Ø§Ù„Ù„ÙŠÙ„. ØªØ¹Ø§Ù…Ù„ Ù…Ø¹ Ø§Ù„ÙˆØµÙˆÙ„ Ø§Ù„Ù…ØªØ£Ø®Ø± Ø¯ÙˆÙ† Ù…ÙˆØ¸ÙÙŠ Ø§Ø³ØªÙ‚Ø¨Ø§Ù„.' },
    { icon: 'catering', title: 'Ø§Ù„Ù…Ø·Ø§Ø¹Ù… ÙˆØ§Ù„ØªÙ…ÙˆÙŠÙ†', desc: 'Ø³Ø¹Ù‘Ø± ÙˆØ§Ø­Ø¬Ø² Ø·Ù„Ø¨Ø§Øª Ø§Ù„ØªÙ…ÙˆÙŠÙ† Ø¯ÙˆÙ† Ø§Ù„Ø­Ø§Ø¬Ø© Ù„Ù„Ø§ØªØµØ§Ù„Ø§Øª Ø§Ù„Ù…ØªÙƒØ±Ø±Ø©. ÙˆØ­Ù‘Ø¯ Ø­Ø¬ÙˆØ²Ø§Øª Ø§Ù„ÙØ¹Ø§Ù„ÙŠØ§Øª Ø§Ù„ÙƒØ¨ÙŠØ±Ø©.' },
    { icon: 'dealerships', title: 'ÙˆÙƒØ§Ù„Ø§Øª Ø§Ù„Ø³ÙŠØ§Ø±Ø§Øª', desc: 'Ø£Ø¬Ø¨ Ø¹Ù† Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ù…Ø®Ø²ÙˆÙ† ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„ÙØ¹Ù„ÙŠ Ø­ÙˆÙ„ Ø§Ù„Ø³ÙŠØ§Ø±Ø§Øª Ø§Ù„Ù…Ø³ØªØ¹Ù…Ù„Ø© ÙÙŠ Ø³Ø§Ø­ØªÙƒ â€” Ø­ØªÙ‰ Ø¨Ø¹Ø¯ Ø³Ø§Ø¹Ø§Øª Ø§Ù„Ø¹Ù…Ù„.' },
    { icon: 'construction', title: 'Ø§Ù„Ø¨Ù†Ø§Ø¡', desc: 'Ø£Ø¨Ù‚Ù Ù…Ù‚Ø§ÙˆÙ„ÙŠ Ø§Ù„Ø¨Ø§Ø·Ù† Ø¹Ù„Ù‰ Ø¹Ù„Ù… Ø¨Ù…ÙˆØ§Ø¹ÙŠØ¯ ØªØ³Ù„ÙŠÙ… Ø§Ù„Ù…ÙˆØ§Ø¯ ÙˆØªØµØ§Ø±ÙŠØ­ Ø§Ù„Ø¹Ù…Ù„ ÙÙŠ Ø§Ù„Ù…ÙˆÙ‚Ø¹ Ø¯ÙˆÙ† Ù…ÙƒØ§Ù„Ù…Ø§Øª ÙŠØ¯ÙˆÙŠØ©.' },
    { icon: 'law', title: 'Ø´Ø±ÙƒØ§Øª Ø§Ù„Ù…Ø­Ø§Ù…Ø§Ø©', desc: 'Ø£Ø¬Ø¨ ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹ Ø¹Ù† Ø£Ø³Ø¦Ù„Ø© Ø±Ø³ÙˆÙ… Ø§Ù„ØªÙˆÙƒÙŠÙ„ ÙˆØ§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ù†Ù…Ø§Ø°Ø¬ Ø§Ù„Ù‚Ø¨ÙˆÙ„. ÙØ±Ù‘Øº Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯ÙŠÙ† Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠÙŠÙ† Ù„Ù„Ø¹Ù…Ù„ Ø§Ù„Ù…Ø¯ÙÙˆØ¹.' },
    { icon: 'accounting', title: 'Ø§Ù„Ù…Ø­Ø§Ø³Ø¨Ø© ÙˆØ§Ù„Ø¶Ø±Ø§Ø¦Ø¨', desc: 'ØªØ¹Ø§Ù…Ù„ Ù…Ø¹ Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø­Ø§Ù„Ø© Ø§Ù„Ø§Ø³ØªØ±Ø¯Ø§Ø¯ ÙÙŠ Ù…ÙˆØ³Ù… Ø§Ù„Ø¶Ø±Ø§Ø¦Ø¨ Ø¯ÙˆÙ† Ù…ÙˆØ¸Ù Ø§Ø³ØªÙ‚Ø¨Ø§Ù„. ÙˆØ¬Ù‘Ù‡ Ø§Ù„Ø­Ø§Ù„Ø§Øª Ø§Ù„Ù…Ø¹Ù‚Ø¯Ø© Ù„ÙƒØ¨Ø§Ø± Ø§Ù„Ù…Ø­Ø§Ø³Ø¨ÙŠÙ†.' },
    { icon: 'retail', title: 'Ø§Ù„ØªØ¬Ø²Ø¦Ø© ÙˆØ§Ù„ØªØ¬Ø§Ø±Ø© Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ©', desc: 'Ø£Ø¬Ø¨ Ø¹Ù† Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª ÙˆØ¹Ø§Ù„Ø¬ Ø§Ù„Ù…Ø±ØªØ¬Ø¹Ø§Øª ÙˆØªÙˆÙ„Ù‰ Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø¹Ø¨Ø± ÙƒÙ„ Ù‚Ù†ÙˆØ§Øª Ø§Ù„Ø§ØªØµØ§Ù„.' },
  ],
  fr: [
    { icon: 'hospitality', title: 'HospitalitÃ©', desc: 'Les hÃ´tels et complexes utilisent SAQYN RABT pour gÃ©rer les arrivÃ©es tardives, le service d\'Ã©tage et les plaintes des clients 24/7.' },
    { icon: 'healthcare', title: 'SantÃ©', desc: 'Les cliniques et hÃ´pitaux automatisent les rÃ©servations, trient les urgences et orientent les demandes instantanÃ©ment.' },
    { icon: 'homeServices', title: 'Services Ã  Domicile', desc: 'Les plombiers et Ã©lectriciens capturent les appels d\'urgence hors heures et envoient des techniciens immÃ©diatement.' },
    { icon: 'realEstate', title: 'Immobilier', desc: 'Les gestionnaires immobiliers orientent les demandes de maintenance et gÃ¨rent les requÃªtes des locataires sans rÃ©ceptionniste.' },
    { icon: 'automotive', title: 'Automobile', desc: 'Les concessions et ateliers automatisent les rendez-vous, les questions de stock et les demandes de devis 24/7.' },
    { icon: 'food', title: 'Restauration', desc: 'Les restaurants et services traiteurs rÃ©servent des tables et prennent des commandes en heures de pointe sans appels manquÃ©s.' },
    { icon: 'towing', title: 'DÃ©pannage', desc: 'Capturez les conducteurs en panne, obtenez les donnÃ©es GPS et envoyez la dÃ©panneuse la plus proche sans appel tÃ©lÃ©phonique.' },
    { icon: 'veterinary', title: 'VÃ©tÃ©rinaire', desc: 'Triez les visites d\'urgence et orientez les cas urgents vers l\'infirmier de garde immÃ©diatement.' },
    { icon: 'plumbing', title: 'Plomberie & Chauffage', desc: 'ArrÃªtez de perdre de l\'argent avec les appels de rÃ©paration manquÃ©s. Capturez chaque prospect et envoyez votre Ã©quipe.' },
    { icon: 'boutique', title: 'HÃ´tels Boutique', desc: 'Laissez les clients s\'attribuer des codes de porte Ã  minuit. GÃ©rez les arrivÃ©es tardives sans personnel de rÃ©ception.' },
    { icon: 'catering', title: 'Restaurants & Traiteurs', desc: 'Faites des devis et rÃ©servez des commandes traiteur sans perdre de temps. Standardisez les grandes rÃ©servations.' },
    { icon: 'dealerships', title: 'Concessions Auto', desc: 'RÃ©pondez aux questions de stock en temps rÃ©el sur les voitures d\'occasion de votre parc, mÃªme aprÃ¨s les heures d\'ouverture.' },
    { icon: 'construction', title: 'Construction', desc: 'Tenez les sous-traitants informÃ©s des heures de livraison des matÃ©riaux et des permis de travail sans appels manuels.' },
    { icon: 'law', title: 'Cabinets d\'Avocats', desc: 'RÃ©pondez aux questions de frais de provision. LibÃ©rez les assistants juridiques pour le travail facturable.' },
    { icon: 'accounting', title: 'ComptabilitÃ© & FiscalitÃ©', desc: 'Gerez le suivi des remboursements fiscaux sans rÃ©ceptionniste. Orientez les cas complexes vers les comptables principaux.' },
    { icon: 'retail', title: 'Commerce & E-commerce', desc: 'RÃ©pondez aux questions sur les produits, gÃ©rez les retours et traitez les demandes des clients sur tous les canaux.' },
  ],
  hi: [
    { icon: 'hospitality', title: 'à¤…à¤¤à¤¿à¤¥à¥à¤¯ à¤¸à¤¤à¥à¤•à¤¾à¤°', desc: 'à¤¹à¥‹à¤Ÿà¤² à¤”à¤° à¤°à¤¿à¤¸à¥‰à¤°à¥à¤Ÿ à¤¦à¥‡à¤° à¤¸à¥‡ à¤šà¥‡à¤•-à¤‡à¤¨, à¤°à¥‚à¤® à¤¸à¤°à¥à¤µà¤¿à¤¸ à¤…à¤¨à¥à¤°à¥‹à¤§ à¤”à¤° à¤…à¤¤à¤¿à¤¥à¤¿ à¤¶à¤¿à¤•à¤¾à¤¯à¤¤à¥‹à¤‚ à¤•à¥‹ 24/7 à¤¸à¤‚à¤­à¤¾à¤²à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ SAQYN RABT à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤' },
    { icon: 'healthcare', title: 'à¤¸à¥à¤µà¤¾à¤¸à¥à¤¥à¥à¤¯ à¤¸à¥‡à¤µà¤¾', desc: 'à¤•à¥à¤²à¤¿à¤¨à¤¿à¤• à¤”à¤° à¤…à¤¸à¥à¤ªà¤¤à¤¾à¤² à¤°à¥‹à¤—à¥€ à¤¬à¥à¤•à¤¿à¤‚à¤— à¤•à¥‹ à¤¸à¥à¤µà¤šà¤¾à¤²à¤¿à¤¤ à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤†à¤ªà¤¾à¤¤ à¤¸à¥à¤¥à¤¿à¤¤à¤¿à¤¯à¥‹à¤‚ à¤•à¥‹ à¤›à¤¾à¤‚à¤Ÿà¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤”à¤° à¤ªà¥‚à¤›à¤¤à¤¾à¤› à¤•à¥‹ à¤¤à¥à¤°à¤‚à¤¤ à¤¸à¤¹à¥€ à¤µà¤¿à¤­à¤¾à¤— à¤®à¥‡à¤‚ à¤­à¥‡à¤œà¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤' },
    { icon: 'homeServices', title: 'à¤—à¥ƒà¤¹ à¤¸à¥‡à¤µà¤¾à¤à¤‚', desc: 'à¤ªà¥à¤²à¤‚à¤¬à¤°, à¤‡à¤²à¥‡à¤•à¥à¤Ÿà¥à¤°à¥€à¤¶à¤¿à¤¯à¤¨ à¤”à¤° à¤à¤šà¤µà¥€à¤à¤¸à¥€ à¤•à¤‚à¤ªà¤¨à¤¿à¤¯à¤¾à¤‚ à¤•à¤¾à¤® à¤•à¥‡ à¤˜à¤‚à¤Ÿà¥‹à¤‚ à¤•à¥‡ à¤¬à¤¾à¤¦ à¤†à¤ªà¤¾à¤¤à¤•à¤¾à¤²à¥€à¤¨ à¤•à¥‰à¤² à¤•à¥ˆà¤ªà¥à¤šà¤° à¤•à¤°à¤¤à¥€ à¤¹à¥ˆà¤‚ à¤”à¤° à¤¤à¤•à¤¨à¥€à¤¶à¤¿à¤¯à¤¨à¥‹à¤‚ à¤•à¥‹ à¤¤à¥à¤°à¤‚à¤¤ à¤­à¥‡à¤œà¤¤à¥€ à¤¹à¥ˆà¤‚à¥¤' },
    { icon: 'realEstate', title: 'à¤°à¤¿à¤¯à¤² à¤à¤¸à¥à¤Ÿà¥‡à¤Ÿ', desc: 'à¤¸à¤‚à¤ªà¤¤à¥à¤¤à¤¿ à¤ªà¥à¤°à¤¬à¤‚à¤§à¤• à¤°à¤–à¤°à¤–à¤¾à¤µ à¤…à¤¨à¥à¤°à¥‹à¤§à¥‹à¤‚ à¤•à¥‹ à¤‘à¤¨-à¤¸à¤¾à¤‡à¤Ÿ à¤•à¥à¤°à¥‚ à¤•à¥‹ à¤­à¥‡à¤œà¤¤à¥‡ à¤¹à¥ˆà¤‚ à¤”à¤° à¤¬à¤¿à¤¨à¤¾ à¤°à¤¿à¤¸à¥‡à¤ªà¥à¤¶à¤¨à¤¿à¤¸à¥à¤Ÿ à¤•à¥‡ à¤•à¤¿à¤°à¤¾à¤¯à¥‡à¤¦à¤¾à¤° à¤ªà¥‚à¤›à¤¤à¤¾à¤› à¤•à¥‹ à¤¸à¤‚à¤­à¤¾à¤²à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤' },
    { icon: 'automotive', title: 'à¤‘à¤Ÿà¥‹à¤®à¥‹à¤Ÿà¤¿à¤µ', desc: 'à¤¡à¥€à¤²à¤°à¤¶à¤¿à¤ª à¤”à¤° à¤®à¤°à¤®à¥à¤®à¤¤ à¤¦à¥à¤•à¤¾à¤¨à¥‡à¤‚ à¤šà¥Œà¤¬à¥€à¤¸à¥‹à¤‚ à¤˜à¤‚à¤Ÿà¥‡ à¤¸à¤°à¥à¤µà¤¿à¤¸ à¤¬à¥à¤•à¤¿à¤‚à¤—, à¤‡à¤¨à¥à¤µà¥‡à¤‚à¤Ÿà¥à¤°à¥€ à¤ªà¥‚à¤›à¤¤à¤¾à¤› à¤”à¤° à¤•à¥‹à¤Ÿ à¤…à¤¨à¥à¤°à¥‹à¤§à¥‹à¤‚ à¤•à¥‹ à¤¸à¥à¤µà¤šà¤¾à¤²à¤¿à¤¤ à¤•à¤°à¤¤à¥€ à¤¹à¥ˆà¤‚à¥¤' },
    { icon: 'food', title: 'à¤–à¤¾à¤¦à¥à¤¯ à¤”à¤° à¤ªà¥‡à¤¯', desc: 'à¤°à¥‡à¤¸à¥à¤Ÿà¥‹à¤°à¥‡à¤‚à¤Ÿ, à¤•à¥ˆà¤«à¥‡ à¤”à¤° à¤–à¤¾à¤¨-à¤ªà¤¾à¤¨ à¤¸à¥‡à¤µà¤¾à¤à¤‚ à¤¬à¤¿à¤¨à¤¾ à¤®à¤¿à¤¸à¥à¤¡ à¤•à¥‰à¤² à¤•à¥‡ à¤µà¥à¤¯à¤¸à¥à¤¤ à¤˜à¤‚à¤Ÿà¥‹à¤‚ à¤•à¥‡ à¤¦à¥Œà¤°à¤¾à¤¨ à¤†à¤°à¤•à¥à¤·à¤£ à¤”à¤° à¤Ÿà¥‡à¤•à¤†à¤‰à¤Ÿ à¤‘à¤°à¥à¤¡à¤° à¤¬à¥à¤• à¤•à¤°à¤¤à¥€ à¤¹à¥ˆà¤‚à¥¤' },
    { icon: 'towing', title: 'à¤Ÿowing à¤”à¤° à¤¸à¤¡à¤¼à¤• à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾', desc: 'à¤«à¤‚à¤¸à¥‡ à¤¹à¥à¤ à¤¡à¥à¤°à¤¾à¤‡à¤µà¤°à¥‹à¤‚ à¤•à¥‹ à¤•à¥ˆà¤ªà¥à¤šà¤° à¤•à¤°à¥‡à¤‚, à¤œà¥€à¤ªà¥€à¤à¤¸ à¤¡à¥‡à¤Ÿà¤¾ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤•à¤°à¥‡à¤‚, à¤”à¤° à¤¬à¤¿à¤¨à¤¾ à¤«à¥‹à¤¨ à¤•à¥‰à¤² à¤•à¥‡ à¤¨à¤¿à¤•à¤Ÿà¤¤à¤® à¤Ÿà¥à¤°à¤• à¤•à¥‹ à¤­à¥‡à¤œà¥‡à¤‚à¥¤' },
    { icon: 'veterinary', title: 'à¤ªà¤¶à¥ à¤šà¤¿à¤•à¤¿à¤¤à¥à¤¸à¤¾', desc: 'à¤†à¤ªà¤¾à¤¤à¤•à¤¾à¤²à¥€à¤¨ à¤ªà¤¾à¤²à¤¤à¥‚ à¤œà¤¾à¤¨à¤µà¤°à¥‹à¤‚ à¤•à¥€ à¤¯à¤¾à¤¤à¥à¤°à¤¾à¤“à¤‚ à¤•à¥‹ à¤›à¤¾à¤‚à¤Ÿà¥‡à¤‚ à¤”à¤° à¤¤à¤¤à¥à¤•à¤¾à¤² à¤®à¤¾à¤®à¤²à¥‹à¤‚ à¤•à¥‹ à¤‘à¤¨-à¤•à¥‰à¤² à¤¨à¤°à¥à¤¸ à¤•à¥‹ à¤¤à¥à¤°à¤‚à¤¤ à¤­à¥‡à¤œà¥‡à¤‚à¥¤' },
    { icon: 'plumbing', title: 'à¤ªà¥à¤²à¤‚à¤¬à¤¿à¤‚à¤— à¤”à¤° à¤à¤šà¤µà¥€à¤à¤¸à¥€', desc: 'à¤•à¤¾à¤® à¤•à¥‡ à¤˜à¤‚à¤Ÿà¥‹à¤‚ à¤•à¥‡ à¤¬à¤¾à¤¦ à¤®à¤¿à¤¸à¥à¤¡ à¤°à¤¿à¤ªà¥‡à¤¯à¤° à¤•à¥‰à¤² à¤¸à¥‡ à¤ªà¥ˆà¤¸à¤¾ à¤–à¥‹à¤¨à¤¾ à¤¬à¤‚à¤¦ à¤•à¤°à¥‡à¤‚à¥¤ à¤¹à¤° à¤²à¥€à¤¡ à¤•à¥‹ à¤•à¥ˆà¤ªà¥à¤šà¤° à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤…à¤ªà¤¨à¥€ à¤«à¥€à¤²à¥à¤¡ à¤Ÿà¥€à¤® à¤•à¥‹ à¤­à¥‡à¤œà¥‡à¤‚à¥¤' },
    { icon: 'boutique', title: 'à¤¬à¥à¤Ÿà¥€à¤• à¤¹à¥‹à¤Ÿà¤²', desc: 'à¤…à¤¤à¤¿à¤¥à¤¿à¤¯à¥‹à¤‚ à¤•à¥‹ à¤†à¤§à¥€ à¤°à¤¾à¤¤ à¤•à¥‹ à¤¡à¤¿à¤œà¤¿à¤Ÿà¤² à¤¡à¥‹à¤° à¤•à¥‹à¤¡ à¤¸à¥à¤µà¤¤à¤ƒ à¤…à¤¸à¤¾à¤‡à¤¨ à¤•à¤°à¤¨à¥‡ à¤¦à¥‡à¤‚à¥¤ à¤«à¥à¤°à¤‚à¤Ÿ-à¤¡à¥‡à¤¸à¥à¤• à¤•à¤°à¥à¤®à¤šà¤¾à¤°à¤¿à¤¯à¥‹à¤‚ à¤•à¥‡ à¤¬à¤¿à¤¨à¤¾ à¤¦à¥‡à¤° à¤¸à¥‡ à¤†à¤¨à¥‡ à¤µà¤¾à¤²à¥‹à¤‚ à¤•à¥‹ à¤¸à¤‚à¤­à¤¾à¤²à¥‡à¤‚à¥¤' },
    { icon: 'catering', title: 'à¤°à¥‡à¤¸à¥à¤Ÿà¥‹à¤°à¥‡à¤‚à¤Ÿ à¤”à¤° à¤–à¤¾à¤¨-à¤ªà¤¾à¤¨', desc: 'à¤¬à¤¿à¤¨à¤¾ à¤•à¤¿à¤¸à¥€ à¤«à¥‹à¤¨ à¤Ÿà¥ˆà¤— à¤•à¥‡ à¤–à¤¾à¤¨-à¤ªà¤¾à¤¨ à¤•à¥‡ à¤‘à¤°à¥à¤¡à¤° à¤•à¥‹à¤Ÿ à¤”à¤° à¤¬à¥à¤• à¤•à¤°à¥‡à¤‚à¥¤ à¤¬à¤¡à¤¼à¥‡ à¤‡à¤µà¥‡à¤‚à¤Ÿ à¤¬à¥à¤•à¤¿à¤‚à¤— à¤•à¥‹ à¤®à¤¾à¤¨à¤•à¥€à¤•à¥ƒà¤¤ à¤•à¤°à¥‡à¤‚à¥¤' },
    { icon: 'dealerships', title: 'à¤‘à¤Ÿà¥‹ à¤¡à¥€à¤²à¤°à¤¶à¤¿à¤ª', desc: 'à¤…à¤ªà¤¨à¥‡ à¤²à¥‰à¤Ÿ à¤ªà¤° à¤‡à¤¸à¥à¤¤à¥‡à¤®à¤¾à¤² à¤•à¥€ à¤—à¤ˆ à¤•à¤¾à¤°à¥‹à¤‚ à¤•à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚ à¤µà¤¾à¤¸à¥à¤¤à¤µà¤¿à¤• à¤¸à¤®à¤¯ à¤®à¥‡à¤‚ à¤‡à¤¨à¥à¤µà¥‡à¤‚à¤Ÿà¥à¤°à¥€ à¤¸à¤µà¤¾à¤²à¥‹à¤‚ à¤•à¥‡ à¤œà¤µà¤¾à¤¬ à¤¦à¥‡à¤‚ â€” à¤•à¤¾à¤® à¤•à¥‡ à¤˜à¤‚à¤Ÿà¥‹à¤‚ à¤•à¥‡ à¤¬à¤¾à¤¦ à¤­à¥€à¥¤' },
    { icon: 'construction', title: 'à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£', desc: 'à¤¬à¤¿à¤¨à¤¾ à¤®à¥ˆà¤¨à¥à¤¯à¥à¤…à¤² à¤•à¥‰à¤² à¤•à¥‡ à¤‰à¤ªà¤ à¥‡à¤•à¥‡à¤¦à¤¾à¤°à¥‹à¤‚ à¤•à¥‹ à¤¸à¤¾à¤®à¤—à¥à¤°à¥€ à¤µà¤¿à¤¤à¤°à¤£ à¤¸à¤®à¤¯ à¤”à¤° à¤¸à¤¾à¤‡à¤Ÿ à¤•à¤¾à¤°à¥à¤¯ à¤ªà¤°à¤®à¤¿à¤Ÿ à¤ªà¤° à¤…à¤ªà¤¡à¥‡à¤Ÿ à¤°à¤–à¥‡à¤‚à¥¤' },
    { icon: 'law', title: 'à¤²à¥‰ à¤«à¤°à¥à¤®', desc: 'à¤°à¤¿à¤Ÿà¥‡à¤¨à¤° à¤¶à¥à¤²à¥à¤• à¤¸à¤µà¤¾à¤²à¥‹à¤‚ à¤”à¤° à¤‡à¤¨à¤Ÿà¥‡à¤• à¤«à¥‰à¤°à¥à¤® à¤ªà¥‚à¤›à¤¤à¤¾à¤› à¤•à¤¾ à¤¸à¥à¤µà¤¤à¤ƒ à¤‰à¤¤à¥à¤¤à¤° à¤¦à¥‡à¤‚à¥¤ à¤¬à¤¿à¤² à¤¯à¥‹à¤—à¥à¤¯ à¤•à¤¾à¤® à¤•à¥‡ à¤²à¤¿à¤ à¤ªà¥ˆà¤°à¤¾à¤²à¥€à¤—à¤² à¤•à¥‹ à¤–à¤¾à¤²à¥€ à¤•à¤°à¥‡à¤‚à¥¤' },
    { icon: 'accounting', title: 'à¤²à¥‡à¤–à¤¾à¤‚à¤•à¤¨ à¤”à¤° à¤•à¤°', desc: 'à¤°à¤¿à¤¸à¥‡à¤ªà¥à¤¶à¤¨à¤¿à¤¸à¥à¤Ÿ à¤•à¥‡ à¤¬à¤¿à¤¨à¤¾ à¤Ÿà¥ˆà¤•à¥à¤¸ à¤¸à¥€à¤œà¤¨ à¤°à¤¿à¤«à¤‚à¤¡ à¤¸à¥à¤¥à¤¿à¤¤à¤¿ à¤•à¥€ à¤œà¤¾à¤‚à¤š à¤•à¥‹ à¤¸à¤‚à¤­à¤¾à¤²à¥‡à¤‚à¥¤ à¤œà¤Ÿà¤¿à¤² à¤®à¤¾à¤®à¤²à¥‹à¤‚ à¤•à¥‹ à¤µà¤°à¤¿à¤·à¥à¤  à¤²à¥‡à¤–à¤¾à¤•à¤¾à¤°à¥‹à¤‚ à¤•à¥‹ à¤­à¥‡à¤œà¥‡à¤‚à¥¤' },
    { icon: 'retail', title: 'à¤–à¥à¤¦à¤°à¤¾ à¤”à¤° à¤ˆ-à¤•à¥‰à¤®à¤°à¥à¤¸', desc: 'à¤‰à¤¤à¥à¤ªà¤¾à¤¦ à¤¸à¤µà¤¾à¤²à¥‹à¤‚ à¤•à¥‡ à¤œà¤µà¤¾à¤¬ à¤¦à¥‡à¤‚, à¤°à¤¿à¤Ÿà¤°à¥à¤¨ à¤ªà¥à¤°à¥‹à¤¸à¥‡à¤¸ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤¹à¤° à¤šà¥ˆà¤¨à¤² à¤ªà¤° à¤—à¥à¤°à¤¾à¤¹à¤•à¥‹à¤‚ à¤•à¥€ à¤ªà¥‚à¤›à¤¤à¤¾à¤› à¤¸à¤‚à¤­à¤¾à¤²à¥‡à¤‚à¥¤' },
  ]
};


export default function IndustriesPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const list = industries[locale as keyof typeof industries] || industries.en;

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'Industries', fr: 'Secteurs d\'activitÃ©', ar: 'Ø§Ù„Ù‚Ø·Ø§Ø¹Ø§Øª', hi: 'à¤‰à¤¦à¥à¤¯à¥‹à¤—' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          {t({ en: 'Built for 16 Industries â€” Worldwide', fr: 'ConÃ§u pour 16 secteurs â€” Dans le monde entier', ar: 'Ù…ØµÙ…Ù… Ù„Ù€ 16 Ù‚Ø·Ø§Ø¹Ø§Ù‹ â€” Ø­ÙˆÙ„ Ø§Ù„Ø¹Ø§Ù„Ù…', hi: '16 à¤‰à¤¦à¥à¤¯à¥‹à¤—à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤¨à¤¿à¤°à¥à¤®à¤¿à¤¤ â€” à¤¦à¥à¤¨à¤¿à¤¯à¤¾ à¤­à¤° à¤®à¥‡à¤‚' })}
        </h1>
        <p className="mt-4 text-lg text-primary max-w-2xl mx-auto">
          {t({ en: 'Global headquarters with local expertise. Our platform adapts to your industry, language, and time zone.', fr: 'SiÃ¨ge mondial avec expertise locale. Notre plateforme s\'adapte Ã  votre secteur, votre langue et votre fuseau horaire.', ar: 'Ù…Ù‚Ø± Ø¹Ø§Ù„Ù…ÙŠ Ù…Ø¹ Ø®Ø¨Ø±Ø© Ù…Ø­Ù„ÙŠØ©. Ù…Ù†ØµØªÙ†Ø§ ØªØªÙƒÙŠÙ Ù…Ø¹ Ù‚Ø·Ø§Ø¹Ùƒ ÙˆÙ„ØºØªÙƒ ÙˆÙ…Ù†Ø·Ù‚ØªÙƒ Ø§Ù„Ø²Ù…Ù†ÙŠØ©.', hi: 'à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯ à¤µà¤¿à¤¶à¥‡à¤·à¤œà¥à¤žà¤¤à¤¾ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤µà¥ˆà¤¶à¥à¤µà¤¿à¤• à¤®à¥à¤–à¥à¤¯à¤¾à¤²à¤¯à¥¤ à¤¹à¤®à¤¾à¤°à¤¾ à¤®à¤‚à¤š à¤†à¤ªà¤•à¥‡ à¤‰à¤¦à¥à¤¯à¥‹à¤—, à¤­à¤¾à¤·à¤¾ à¤”à¤° à¤¸à¤®à¤¯ à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤•à¥‡ à¤…à¤¨à¥à¤•à¥‚à¤² à¤¹à¥ˆà¥¤' })}
        </p>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((ind) => (
              <div key={ind.title} className="bg-background border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md transition-all shadow-card">
                <span className="text-3xl mb-3 block">{industryIcons[ind.icon] || <Building2 className="w-8 h-8 text-primary" />}</span>
                <h3 className="text-lg font-bold text-primary mb-2">{ind.title}</h3>
                <p className="text-sm text-primary leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            {t({ en: 'Don\'t see your industry?', fr: 'Vous ne voyez pas votre secteur ?', ar: 'Ù„Ø§ ØªØ±Ù‰ Ù‚Ø·Ø§Ø¹ÙƒØŸ', hi: 'à¤…à¤ªà¤¨à¤¾ à¤‰à¤¦à¥à¤¯à¥‹à¤— à¤¨à¤¹à¥€à¤‚ à¤¦à¤¿à¤– à¤°à¤¹à¤¾ à¤¹à¥ˆ?' })}
          </h2>
          <p className="text-primary mb-8">
            {t({ en: 'SAQYN RABT is industry-agnostic. We build custom workflows for any business type.', fr: 'SAQYN RABT est indÃ©pendant du secteur. Nous construisons des flux de travail personnalisÃ©s pour tout type d\'entreprise.', ar: 'SAQYN RABT ØºÙŠØ± Ù…Ù‚ÙŠØ¯Ø© Ø¨ØµÙ†Ø§Ø¹Ø© Ù…Ø¹ÙŠÙ†Ø©. Ù†Ø¨Ù†ÙŠ Ø³ÙŠØ± Ø¹Ù…Ù„ Ù…Ø®ØµØµ Ù„Ø£ÙŠ Ù†ÙˆØ¹ Ø¹Ù…Ù„.', hi: 'SAQYN RABT à¤‰à¤¦à¥à¤¯à¥‹à¤—-à¤…à¤œà¥à¤žà¥‡à¤¯à¤µà¤¾à¤¦à¥€ à¤¹à¥ˆà¥¤ à¤¹à¤® à¤•à¤¿à¤¸à¥€ à¤­à¥€ à¤ªà¥à¤°à¤•à¤¾à¤° à¤•à¥‡ à¤µà¥à¤¯à¤µà¤¸à¤¾à¤¯ à¤•à¥‡ à¤²à¤¿à¤ à¤•à¤¸à¥à¤Ÿà¤® à¤µà¤°à¥à¤•à¤«à¤¼à¥à¤²à¥‹ à¤¬à¤¨à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-bold min-h-[44px] text-surface hover:opacity-90 transition-all"
          >
            {t({ en: 'See how it works', fr: 'DÃ©couvrez comment Ã§a marche', ar: 'Ø´Ø§Ù‡Ø¯ ÙƒÙŠÙ ÙŠØ¹Ù…Ù„', hi: 'à¤¦à¥‡à¤–à¥‡à¤‚ à¤¯à¤¹ à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
