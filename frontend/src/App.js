import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import { LocaleProvider } from "@/i18n/LocaleContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

import Home from "@/pages/Home";
import Maison from "@/pages/Maison";
import Values from "@/pages/Values";
import WorldsOverview from "@/pages/WorldsOverview";
import WorldHost from "@/pages/WorldHost";
import WorldMaster from "@/pages/WorldMaster";
import WorldObserver from "@/pages/WorldObserver";
import EditionsOverview from "@/pages/EditionsOverview";
import EditionParfum from "@/pages/EditionParfum";
import EditionSets from "@/pages/EditionSets";
import EditionSkincare from "@/pages/EditionSkincare";
import EditionEcosystem from "@/pages/EditionEcosystem";
import Layering from "@/pages/Layering";
import Access from "@/pages/Access";
import Enter from "@/pages/Enter";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import SeoAllelium from "@/pages/SeoAllelium";
import SeoPersonalizedSkincare from "@/pages/SeoPersonalizedSkincare";
import SeoPersonalizedFragrance from "@/pages/SeoPersonalizedFragrance";
import SeoParisApothecary from "@/pages/SeoParisApothecary";
import SeoHowItWorks from "@/pages/SeoHowItWorks";
import Journal from "@/pages/Journal";
import JournalArticle from "@/pages/JournalArticle";
import ArtPieces from "@/pages/ArtPieces";

function App() {
  return (
    <div className="App">
      <LocaleProvider>
        <AdminAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/maison" element={<Maison />} />
                <Route path="/values" element={<Values />} />
                <Route path="/worlds" element={<WorldsOverview />} />
                <Route path="/worlds/host" element={<WorldHost />} />
                <Route path="/worlds/master" element={<WorldMaster />} />
                <Route path="/worlds/observer" element={<WorldObserver />} />
                <Route path="/editions" element={<EditionsOverview />} />
                <Route path="/editions/parfum" element={<EditionParfum />} />
                <Route path="/editions/sets" element={<EditionSets />} />
                <Route path="/editions/skincare" element={<EditionSkincare />} />
                <Route path="/editions/ecosystem" element={<EditionEcosystem />} />
                <Route path="/layering" element={<Layering />} />
                <Route path="/access" element={<Access />} />
                <Route path="/preorder" element={<Access />} />
                <Route path="/enter" element={<Enter />} />
                <Route path="/contact" element={<Contact />} />
                {/* SEO landing pages — search intent + FAQ schema */}
                <Route path="/allelium" element={<SeoAllelium />} />
                <Route path="/personalized-skincare" element={<SeoPersonalizedSkincare />} />
                <Route path="/personalized-fragrance" element={<SeoPersonalizedFragrance />} />
                <Route path="/paris-apothecary" element={<SeoParisApothecary />} />
                <Route path="/how-it-works" element={<SeoHowItWorks />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/journal/:slug" element={<JournalArticle />} />
                <Route path="/art-pieces" element={<ArtPieces />} />
              </Route>
              {/* Admin routes — hidden from public nav, layout-less */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminDashboard />} />
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </LocaleProvider>
    </div>
  );
}

export default App;
