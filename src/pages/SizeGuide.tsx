import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-32">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground font-heading mb-4">
              Size Guide
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              Find your perfect fit with our detailed size charts.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* How to Measure */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-heading mb-6">
                How to Measure
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-bold text-foreground font-heading mb-2">Bust</h3>
                  <p className="text-sm text-muted-foreground font-body">
                    Measure around the fullest part of your bust, keeping the tape parallel to the floor.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-bold text-foreground font-heading mb-2">Waist</h3>
                  <p className="text-sm text-muted-foreground font-body">
                    Measure around your natural waistline, keeping the tape comfortably loose.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-bold text-foreground font-heading mb-2">Hips</h3>
                  <p className="text-sm text-muted-foreground font-body">
                    Measure around the fullest part of your hips, about 8 inches below your waist.
                  </p>
                </div>
              </div>
            </div>

            {/* Kurti Size Chart */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-heading mb-6">
                Kurtis & Tops
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="border border-border p-3 text-left font-bold font-body">Size</th>
                      <th className="border border-border p-3 text-left font-bold font-body">Bust (inches)</th>
                      <th className="border border-border p-3 text-left font-bold font-body">Waist (inches)</th>
                      <th className="border border-border p-3 text-left font-bold font-body">Hip (inches)</th>
                      <th className="border border-border p-3 text-left font-bold font-body">Length (inches)</th>
                    </tr>
                  </thead>
                  <tbody className="font-body text-muted-foreground">
                    <tr><td className="border border-border p-3">XS</td><td className="border border-border p-3">32-34</td><td className="border border-border p-3">26-28</td><td className="border border-border p-3">34-36</td><td className="border border-border p-3">44</td></tr>
                    <tr className="bg-secondary/30"><td className="border border-border p-3">S</td><td className="border border-border p-3">34-36</td><td className="border border-border p-3">28-30</td><td className="border border-border p-3">36-38</td><td className="border border-border p-3">45</td></tr>
                    <tr><td className="border border-border p-3">M</td><td className="border border-border p-3">36-38</td><td className="border border-border p-3">30-32</td><td className="border border-border p-3">38-40</td><td className="border border-border p-3">46</td></tr>
                    <tr className="bg-secondary/30"><td className="border border-border p-3">L</td><td className="border border-border p-3">38-40</td><td className="border border-border p-3">32-34</td><td className="border border-border p-3">40-42</td><td className="border border-border p-3">47</td></tr>
                    <tr><td className="border border-border p-3">XL</td><td className="border border-border p-3">40-42</td><td className="border border-border p-3">34-36</td><td className="border border-border p-3">42-44</td><td className="border border-border p-3">48</td></tr>
                    <tr className="bg-secondary/30"><td className="border border-border p-3">2XL</td><td className="border border-border p-3">42-44</td><td className="border border-border p-3">36-38</td><td className="border border-border p-3">44-46</td><td className="border border-border p-3">49</td></tr>
                    <tr><td className="border border-border p-3">3XL</td><td className="border border-border p-3">44-46</td><td className="border border-border p-3">38-40</td><td className="border border-border p-3">46-48</td><td className="border border-border p-3">50</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Wear Size Chart */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground font-heading mb-6">
                Palazzos & Pants
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="border border-border p-3 text-left font-bold font-body">Size</th>
                      <th className="border border-border p-3 text-left font-bold font-body">Waist (inches)</th>
                      <th className="border border-border p-3 text-left font-bold font-body">Hip (inches)</th>
                      <th className="border border-border p-3 text-left font-bold font-body">Length (inches)</th>
                    </tr>
                  </thead>
                  <tbody className="font-body text-muted-foreground">
                    <tr><td className="border border-border p-3">S</td><td className="border border-border p-3">26-28</td><td className="border border-border p-3">36-38</td><td className="border border-border p-3">38</td></tr>
                    <tr className="bg-secondary/30"><td className="border border-border p-3">M</td><td className="border border-border p-3">28-30</td><td className="border border-border p-3">38-40</td><td className="border border-border p-3">39</td></tr>
                    <tr><td className="border border-border p-3">L</td><td className="border border-border p-3">30-32</td><td className="border border-border p-3">40-42</td><td className="border border-border p-3">40</td></tr>
                    <tr className="bg-secondary/30"><td className="border border-border p-3">XL</td><td className="border border-border p-3">32-34</td><td className="border border-border p-3">42-44</td><td className="border border-border p-3">41</td></tr>
                    <tr><td className="border border-border p-3">2XL</td><td className="border border-border p-3">34-36</td><td className="border border-border p-3">44-46</td><td className="border border-border p-3">42</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-secondary/30 p-6 lg:p-8 rounded-lg">
              <h2 className="text-xl font-bold text-foreground font-heading mb-4">
                Size Selection Tips
              </h2>
              <ul className="space-y-3 text-muted-foreground font-body">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>If you're between sizes, we recommend going for the larger size for a comfortable fit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>For a fitted look, choose your exact size or one size smaller.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Measurements may vary slightly (±0.5 inch) due to the nature of handcrafted products.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Still unsure? Contact our customer support for personalized sizing assistance.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SizeGuide;
