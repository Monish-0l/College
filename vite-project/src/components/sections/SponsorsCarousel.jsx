import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ExternalLink } from 'lucide-react';
// Ensure this import path is correct and getSponsorsByTier works as expected
import { sponsors, getSponsorsByTier } from '../../data/sponsors';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SponsorsCarousel = () => {
  // *** THIS IS THE IMPORTANT PART ***
  // Only Platinum and Gold should be listed here
  const sponsorTiers = [
    { tier: 'platinum', title: 'Platinum Sponsors', color: 'text-gray-300' },
    { tier: 'gold', title: 'Gold Sponsors', color: 'text-yellow-400' },
    // Silver and Bronze should be removed or commented out like below
    // { tier: 'silver', title: 'Silver Sponsors', color: 'text-gray-400' },
    // { tier: 'bronze', title: 'Bronze Sponsors', color: 'text-orange-600' }
  ];
  // *** END OF IMPORTANT PART ***

  const SponsorCard = ({ sponsor }) => (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="group"
    >
      <a
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className="block glass hover:bg-white/10 rounded-xl p-6 h-32 flex items-center justify-center transition-all duration-300"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded-lg transition-opacity">
            <ExternalLink className="w-6 h-6 text-white" />
          </div>
        </div>
      </a>
    </motion.div>
  );

  return (
    <div className="space-y-12">
      {sponsorTiers.map(({ tier, title, color }) => {
        // This function should correctly get sponsors based on the tier string
        const tierSponsors = getSponsorsByTier(tier);

        if (!tierSponsors || tierSponsors.length === 0) return null;

        return (
          <motion.div
            key={tier}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className={`text-xl font-semibold text-center ${color}`}>
              {title}
            </h3>

            {tierSponsors.length > 4 ? (
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation
                loop
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                className="w-full"
              >
                {tierSponsors.map((sponsor) => (
                  <SwiperSlide key={sponsor.id}>
                    <SponsorCard sponsor={sponsor} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className={`grid gap-6 ${
                tierSponsors.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
                tierSponsors.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' :
                tierSponsors.length === 3 ? 'grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto' :
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}>
                {tierSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            )}
          </motion.div>
        );
      })}

       {/* Removed the "Become a Sponsor" CTA based on your previous image comment */}
       {/*
       <motion.div ... >
         ...
       </motion.div>
       */}
    </div>
  );
};

export default SponsorsCarousel;