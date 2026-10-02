const img = (id, size = 'w=800&h=450') => `https://images.unsplash.com/${id}?${size}&fit=crop`

// Données invariantes des articles ; les textes viennent de i18n (news.articles[i], ui.news.content[i]).
export const articlesConfig = [
  { slug: 'assurance-sante-cameroun', image: img('photo-1576091160550-2173dba999ef'), heroImage: img('photo-1576091160550-2173dba999ef', 'w=1200&h=675'), featureImage: img('photo-1576091160550-2173dba999ef', 'w=1000&h=700') },
  { slug: 'protection-entreprises', image: img('photo-1507679799987-c73779587ccf'), heroImage: img('photo-1507679799987-c73779587ccf', 'w=1200&h=675') },
  { slug: 'tendances-assurance-afrique', image: img('photo-1486406146926-c627a92ad1ab'), heroImage: img('photo-1486406146926-c627a92ad1ab', 'w=1200&h=675') },
  { slug: 'choisir-bonne-assurance', image: img('photo-1554224155-6726b3ff858f'), heroImage: img('photo-1554224155-6726b3ff858f', 'w=1200&h=675') },
  { slug: 'assurance-responsabilite-civile', image: img('photo-1521791136064-7986c2920216'), heroImage: img('photo-1521791136064-7986c2920216', 'w=1200&h=675') },
  { slug: 'epargne-assurance-vie', image: img('photo-1579621970563-ebec7560ff3e'), heroImage: img('photo-1579621970563-ebec7560ff3e', 'w=1200&h=675') },
]
