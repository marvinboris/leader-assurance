import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { articlesConfig } from './news/articles'
import NewsList from './news/NewsList'
import NewsArticle from './news/NewsArticle'
import './News.css'

export default function News() {
  const { t } = useTranslation()
  const { slug } = useParams()

  const articlesData = t('news.articles', { returnObjects: true })
  const contents = t('ui.news.content', { returnObjects: true })
  const articles = articlesConfig.map((cfg, i) => ({ ...cfg, ...articlesData[i], body: contents[i] }))

  const article = slug && articles.find(a => a.slug === slug)
  if (article) return <NewsArticle article={article} articles={articles} />
  return <NewsList articles={articles} />
}
