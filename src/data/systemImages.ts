import businessSaas from '@/assets/systems/business-saas.jpg';
import ecommerce from '@/assets/systems/ecommerce.jpg';
import aiSaas from '@/assets/systems/ai-saas.jpg';
import socialCommunity from '@/assets/systems/social-community.jpg';
import education from '@/assets/systems/education.jpg';
import healthcare from '@/assets/systems/healthcare.jpg';
import booking from '@/assets/systems/booking.jpg';
import finance from '@/assets/systems/finance.jpg';
import marketing from '@/assets/systems/marketing.jpg';
import utility from '@/assets/systems/utility.jpg';
import coreBusiness from '@/assets/systems/core-business.jpg';
import educationSystems from '@/assets/systems/education-systems.jpg';
import healthcareSystems from '@/assets/systems/healthcare-systems.jpg';
import retailCommerce from '@/assets/systems/retail-commerce.jpg';
import hospitalityTravel from '@/assets/systems/hospitality-travel.jpg';
import fitnessLifestyle from '@/assets/systems/fitness-lifestyle.jpg';
import corporateOffice from '@/assets/systems/corporate-office.jpg';
import logisticsTransport from '@/assets/systems/logistics-transport.jpg';
import realEstate from '@/assets/systems/real-estate.jpg';
import financeBanking from '@/assets/systems/finance-banking.jpg';
import contentMedia from '@/assets/systems/content-media.jpg';
import specializedIndustry from '@/assets/systems/specialized-industry.jpg';

/** Cinematic banner image for each system category, keyed by category id. */
export const categoryImages: Record<string, string> = {
  business: businessSaas,
  ecommerce: ecommerce,
  'ai-saas': aiSaas,
  social: socialCommunity,
  education: education,
  healthcare: healthcare,
  booking: booking,
  finance: finance,
  marketing: marketing,
  utility: utility,
  'core-business': coreBusiness,
  'education-systems': educationSystems,
  'healthcare-systems': healthcareSystems,
  'retail-commerce': retailCommerce,
  'hospitality-travel': hospitalityTravel,
  'fitness-lifestyle': fitnessLifestyle,
  'corporate-office': corporateOffice,
  'logistics-transport': logisticsTransport,
  'real-estate': realEstate,
  'finance-banking': financeBanking,
  'content-media': contentMedia,
  'specialized-industry': specializedIndustry,
};

export const getCategoryImage = (id: string): string =>
  categoryImages[id] ?? businessSaas;
