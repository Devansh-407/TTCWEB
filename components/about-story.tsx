import { getAboutStory } from "@/lib/data-loader"

export function AboutStory() {
  const story = getAboutStory()
  return (
    <section id="journey" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">The Beginning of Our Journey</h2>
        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          {story.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
