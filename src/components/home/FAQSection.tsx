import { FAQ_DATA } from '@/lib/constants';

export function FAQSection() {
  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-3">
            <h2 className="text-[18px] font-bold text-white tracking-widest uppercase">SSS</h2>
            <p className="text-[13px] text-white/50 mt-2 tracking-wider">
              Piyasa işleyişi ve işlemlerimiz hakkında bilgilendirmeler.
            </p>
          </div>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FAQ_DATA.map((faq, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-[13px] font-bold tracking-widest text-[var(--color-primary)] uppercase">
                    {faq.question}
                  </h3>
                  <p className="text-[13px] text-white/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
