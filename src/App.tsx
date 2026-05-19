/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DivisionPage from "./pages/DivisionPage";
import { Truck, Laptop, HardHat, TrendingUp } from "lucide-react";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/logistics"
              element={
                <DivisionPage
                  id="logistics"
                  icon={<Truck />}
                  imageUrl="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
                />
              }
            />
            <Route
              path="/it"
              element={
                <DivisionPage
                  id="it"
                  icon={<Laptop />}
                  imageUrl="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                />
              }
            />
            <Route
              path="/contracting"
              element={
                <DivisionPage
                  id="contracting"
                  icon={<HardHat />}
                  imageUrl="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
                />
              }
            />
            <Route
              path="/marketing"
              element={
                <DivisionPage
                  id="marketing"
                  icon={<TrendingUp />}
                  imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                />
              }
            />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}
