/* ============================================================
   projects.js — Real project data (verified video IDs)
   Each project: id, title key, tag key, desc key, videoId, image,
   platform, year, and a longer story key for the detail page.
   ============================================================ */
const PROJECTS = [
  {
    id: 'pharaonic-anime',
    titleKey: 'work_p1_title',
    tagKey: 'work_p1_tag',
    descKey: 'work_p1_desc',
    storyKey: 'story_p1',
    videoId: 'TzIuNJ86-LQ',
    image: 'img/menes.jpg',
    platform: 'YouTube · Bilibili',
    year: '2025'
  },
  {
    id: 'titanic-1912',
    titleKey: 'work_p2_title',
    tagKey: 'work_p2_tag',
    descKey: 'work_p2_desc',
    storyKey: 'story_p2',
    videoId: 'd4MIzWTf99A',
    image: 'img/titanic.jpg',
    platform: 'YouTube',
    year: '2025'
  },
  {
    id: 'chernobyl',
    titleKey: 'work_p3_title',
    tagKey: 'work_p3_tag',
    descKey: 'work_p3_desc',
    storyKey: 'story_p3',
    videoId: 'iAp6u-50q3s',
    image: 'img/chernobyl.jpg',
    platform: 'YouTube',
    year: '2025'
  },
  {
    id: 'dawn-of-civilization',
    titleKey: 'work_p4_title',
    tagKey: 'work_p4_tag',
    descKey: 'work_p4_desc',
    storyKey: 'story_p4',
    videoId: 'uuuDBv5d8I4',
    image: 'img/dawn.jpg',
    platform: 'YouTube',
    year: '2025'
  },
  {
    id: 'minecraft-narrative',
    titleKey: 'work_p5_title',
    tagKey: 'work_p5_tag',
    descKey: 'work_p5_desc',
    storyKey: 'story_p5',
    videoId: 'JDBnVETohnc',
    image: 'img/minecraft.jpg',
    platform: 'YouTube',
    year: '2025'
  },
  {
    id: 'thoth-neon-anime',
    titleKey: 'work_p6_title',
    tagKey: 'work_p6_tag',
    descKey: 'work_p6_desc',
    storyKey: 'story_p6',
    videoId: '5nK-F3Frp_s',
    image: 'img/thoth.jpg',
    platform: 'YouTube',
    year: '2025'
  },
  {
    id: 'time-travelers-confessions',
    titleKey: 'work_p7_title',
    tagKey: 'work_p7_tag',
    descKey: 'work_p7_desc',
    storyKey: 'story_p7',
    videoId: 'CLjUCxyEXuY',
    image: 'img/oasis.jpg',
    platform: 'YouTube',
    year: '2025'
  },
  {
    id: 'branded-ai-ads',
    titleKey: 'work_p8_title',
    tagKey: 'work_p8_tag',
    descKey: 'work_p8_desc',
    storyKey: 'story_p8',
    videoId: 'kRBwPvFz4Mg',
    image: 'img/nur.jpg',
    platform: 'YouTube',
    year: '2025'
  }
];

/* Look up a project by its URL ?id= value */
// eslint-disable-next-line no-unused-vars -- consumed as a global by project.js (no bundler/module system)
function getProject(id) {
  return PROJECTS.find(function (p) { return p.id === id; });
}
