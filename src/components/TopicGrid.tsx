
import { MessageSquare, ThumbsUp } from "lucide-react";

const TopicCard = ({ title, description, image }: {
  title: string;
  description: string;
  image: string;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 animate-fade-in">
    <div className="aspect-video w-full overflow-hidden">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-6">
      <h3 className="text-base font-medium mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
    </div>
  </div>
);

const TopicGrid = () => {
  const topics = [
    {
      title: "𝗥𝗘𝗦𝗨𝗟𝗧𝗦 𝗔𝗥𝗘 𝗢𝗨𝗧 ",
      description: "| You did it! Congratulations to our new Registered Respiratory Therapists. We are so proud of you!",
      image: "https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/480235317_1196914052442809_8255160039762470674_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ePoL3kj0wHkQ7kNvgHRgate&_nc_oc=AdjqN0O1W3fcp__Ar4qGoYpZ1GnJWnpdOdUZ-XSwJIrE-ZzHEAPcN1UmRD3Ynb8sV2A&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=AXVisY7U9s8VaGWA8H-DG2U&oh=00_AYAPOYBiOMVetgx4UlhvFrrmQaHilHBxtDTuQKzBHC2mhA&oe=67C3CCF9",
    },
    {
      title: "𝐀𝐔𝐃𝐈𝐓𝐈𝐎𝐍 𝐈𝐒 𝐍𝐎𝐖 𝐎𝐏𝐄𝐍!",
      description: "𝐍𝐄𝐖 𝐄𝐑𝐀 𝐔𝐍𝐈𝐕𝐄𝐑𝐒𝐈𝐓𝐘 𝐂𝐇𝐎𝐈𝐑 is now up for Auditions! Whether you’re an experienced singer or just starting out, this is your chance to shine!",
      image: "https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/480542248_663594636013062_296286633203751279_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=B8sceocfYBoQ7kNvgFC-U62&_nc_oc=AdhJEEy6EY7sZS_XOJ1j_Fu52qz0dR31St6yxmpgymvu8Lu_jesi2KNOcWGf-bsOlfY&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=AUQL1oM3r1NPAcJCF1LdY1n&oh=00_AYBFMp6I9WmLfFRW6CKC__xzKJCUP_mcVUir1qiBcXf1kg&oe=67C3A457",
    },
    {
      title: "New Era University Library",
      description: "Experience the excitement of discovery—visit our libraries at the NEU Main Campus!",
      image: "https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/476843801_122107671560743934_6691534266104108481_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=aT-mmE_eJpUQ7kNvgF0gylj&_nc_oc=Adi_wirpifCNoOHDKRGS7XXjwYtVfzRv-iYKx0MLihquhyjtn_YGCd_F3eJrRfA8ZT0&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=AZ4AKvGe-r-bnhRrkC4nklA&oh=00_AYCboFO0ZStNiUGygJfCRa10tscoULMqFqVynThVZVk_2Q&oe=67C3B6CE",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {topics.map((topic, index) => (
        <TopicCard key={index} {...topic} />
      ))}
    </div>
  );
};

export default TopicGrid;
