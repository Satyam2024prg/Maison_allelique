import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ARTICLES } from "@/data/articles";

const JournalArticle = () => {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return <Navigate to="/journal" replace />;
  return (
    <ArticleLayout
      slug={article.slug}
      title={article.title}
      eyebrow={article.eyebrow}
      deck={article.deck}
      datePublished={article.date}
      description={article.description}
      keywords={article.keywords}
    >
      {article.body}
    </ArticleLayout>
  );
};

export default JournalArticle;
