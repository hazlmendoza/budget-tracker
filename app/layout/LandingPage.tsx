import FAQItem from '@/components/FAQItem'
import FeatureCard from '@/components/FeatureCard'
import { ChartArea, PiggyBank, Wallet } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const LandingPage = () => {
  return (
    <div className="bg-gray-100">
            {/* Hero Section */}
            <header className="bg-muted py-48">
              <div className="container mx-auto text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold">Welcome to Savis</h1>
                <p className="mt-4 text-lg md:text-xl">
                  Your all-in-one app for tracking expenses, budgeting, and saving money.
                </p>
                <Link
                  href="#signup"
                  className="mt-6 inline-block bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/75 transition duration-300"
                  aria-label="Get Started for Free"
                >
                  Get Started for Free
                </Link>
              </div>
            </header>

            {/* Features Section */}
            <main className="container mx-auto py-10 px-4">
              <section className="text-center px-56">
                <h2 className="text-3xl font-bold">Key Features</h2>
                <p className="mt-4 text-lg text-gray-700">
                  Discover how Savis can help you take control of your finances.
                </p>
              </section>

              <div className="flex flex-wrap justify-center mt-6">
                <FeatureCard
                  icon={<ChartArea />}
                  title="Expense Tracking"
                  description="Monitor your spending in real-time and categorize expenses for better insights."
                />
                <FeatureCard
                  icon={<Wallet />}
                  title="Budgeting Tools"
                  description="Create personalized budgets and receive alerts when you're close to exceeding your limits."
                />
                <FeatureCard
                  icon={<PiggyBank />}
                  title="Savings Goals"
                  description="Set savings goals and track your progress to achieve them."
                />
              </div>

              {/* Summary Section */}
              <section className="mt-10 text-center">
                <h2 className="text-3xl font-bold">Why Choose Savis?</h2>
                <p className="mt-4 text-gray-700">
                  With Savis, you can effortlessly manage your finances, make informed decisions, and achieve your financial goals.
                </p>
              </section>

              {/* FAQ Section */}
              <section className="mt-10">
                <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
                <div className="mt-4 space-y-4">
                  <FAQItem
                    question="Is Savis free to use?"
                    answer="Yes, Savis offers a free version with essential features."
                  />
                  <FAQItem
                    question="How can I set savings goals?"
                    answer="You can easily set savings goals in the app and monitor your progress."
                  />
                </div>
              </section>

              {/* Call to Action Section */}
              <section className="mt-10 text-center">
                <h2 className="text-3xl font-bold">Start Managing Your Finances Today!</h2>
                <p className="mt-4 text-gray-700">
                  Join thousands of users who are taking control of their financial futures with Savis.
                </p>
                <Link
                  href="/signup"
                  className="mt-6 inline-block bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/75 transition duration-300"
                >
                  Sign In
                </Link>
              </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-200 py-4 text-center text-sm text-gray-600">
              <p>© 2023 Savis. All rights reserved.</p>
            </footer>
          </div>

  )
}

export default LandingPage