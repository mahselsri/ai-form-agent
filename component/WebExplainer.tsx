"use client"

type LinkItem = {
  title: string
  url: string
  why_it_matters: string
}

type StepItem = {
  step: string
  action: string
}

type WebExplain = {
  title: string
  what_this_site_is: string
  who_should_use_this: string
  what_you_can_do_here: string[]
  how_to_use_this_site: StepItem[]
  important_links: LinkItem[]
  pro_tips: string[]
}

export default function WebExplainer({ data }: { data: WebExplain }) {

  if (!data) return null

  return (

    <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">

      {/* Title */}
      <h2 className="text-2xl font-bold text-blue-600">
        {data.title}
      </h2>

      {/* What is this */}
      <div>
        <h3 className="font-semibold text-lg mb-1">🧠 What is this?</h3>
        <p className="text-gray-700">{data.what_this_site_is}</p>
      </div>

      {/* Who should use */}
      <div>
        <h3 className="font-semibold text-lg mb-1">👤 Who should use this?</h3>
        <p className="text-gray-700">{data.who_should_use_this}</p>
      </div>

      {/* What you can do */}
      <div>
        <h3 className="font-semibold text-lg mb-2">⚡ What can you do here?</h3>
        <ul className="space-y-2">
        {Array.isArray(data.what_you_can_do_here) &&
        data.what_you_can_do_here.map((item: string, i: number) => (
      <li key={i} className="flex items-start gap-2">
        <span>✔️</span>
        <span>{item}</span>
      </li>
  ))}
</ul>
      </div>

      {/* How to use */}
      <div>
        <h3 className="font-semibold text-lg mb-2">🧭 How to use this site</h3>
        <div className="space-y-3">
          {Array.isArray(data.how_to_use_this_site) &&
 data.how_to_use_this_site.map((step, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">
                {i + 1}. {step.step}
              </p>
              <p className="text-gray-600 text-sm">
                👉 {step.action}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Important links */}
      <div>
        <h3 className="font-semibold text-lg mb-2">🔗 Important Links</h3>
        <div className="space-y-3">
          {Array.isArray(data.important_links) &&
 data.important_links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              className="block p-3 border rounded-lg hover:bg-gray-50 transition"
            >
              <p className="font-medium text-blue-600">
                {link.title}
              </p>
              <p className="text-sm text-gray-600">
                {link.why_it_matters}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Pro tips */}
      <div>
        <h3 className="font-semibold text-lg mb-2">💡 Pro Tips</h3>
        <ul className="space-y-2">
          {Array.isArray(data.pro_tips) &&
 data.pro_tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span>⭐</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}