"use client"

import { useState } from "react"
import { Sparkles, Copy, RefreshCw, Save, Globe, Briefcase, Heart, Zap, Check, Send, Phone } from "lucide-react"

const WishFlow = () => {
  const [prompt, setPrompt] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [relationship, setRelationship] = useState("customer")
  const [brandVoice, setBrandVoice] = useState("friendly")
  const [selectedFestival, setSelectedFestival] = useState("")
  const [region, setRegion] = useState("indian")
  const [generatedMessages, setGeneratedMessages] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [savedMessages, setSavedMessages] = useState([])
  const [customField, setCustomField] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [sendingIndex, setSendingIndex] = useState(null)
  const [sentMessages, setSentMessages] = useState(new Set())

  const festivals = {
    indian: [
      { id: "diwali", name: "Diwali", emoji: "🪔" },
      { id: "holi", name: "Holi", emoji: "🎨" },
      { id: "navratri", name: "Navratri", emoji: "🕉️" },
      { id: "raksha-bandhan", name: "Raksha Bandhan", emoji: "🧵" },
      { id: "eid", name: "Eid", emoji: "🌙" },
      { id: "pongal", name: "Pongal", emoji: "🌾" },
      { id: "onam", name: "Onam", emoji: "🌺" },
    ],
    american: [
      { id: "thanksgiving", name: "Thanksgiving", emoji: "🦃" },
      { id: "july4", name: "Independence Day", emoji: "🎆" },
      { id: "christmas", name: "Christmas", emoji: "🎄" },
      { id: "newyear", name: "New Year", emoji: "🎉" },
      { id: "memorial", name: "Memorial Day", emoji: "🇺🇸" },
      { id: "labor", name: "Labor Day", emoji: "⚙️" },
      { id: "valentines", name: "Valentine's Day", emoji: "💝" },
    ],
  }

  const brandVoices = {
    formal: { name: "Formal", icon: Briefcase, desc: "Professional & Corporate" },
    friendly: { name: "Friendly", icon: Heart, desc: "Warm & Approachable" },
    playful: { name: "Playful", icon: Sparkles, desc: "Fun & Energetic" },
    premium: { name: "Premium", icon: Zap, desc: "Luxury & Elegant" },
  }

  const relationships = [
    { id: "new-lead", label: "New Lead", context: "first interaction" },
    { id: "customer", label: "Customer", context: "established relationship" },
    { id: "loyal-customer", label: "Loyal Customer", context: "long-term valued client" },
    { id: "partner", label: "Business Partner", context: "collaborative relationship" },
    { id: "team", label: "Team Member", context: "internal colleague" },
  ]

  const generateMessages = () => {
    if (!selectedFestival || !recipientName) {
      alert("Please select a festival and enter recipient name")
      return
    }

    const festival = [...festivals.indian, ...festivals.american].find((f) => f.id === selectedFestival)
    const relationshipData = relationships.find((r) => r.id === relationship)

    const templates = {
      formal: [
        `Dear {name},\n\nOn behalf of our entire team, we extend our warmest wishes to you and your loved ones this ${festival.name}. May this festive season bring prosperity and success to your endeavors.\n\nBest regards,\n[Your Company]`,
        `{name},\n\nWishing you a joyous ${festival.name} filled with happiness and success. We value your partnership and look forward to continued collaboration in the year ahead.\n\nWarm regards,\n[Your Team]`,
        `Hello {name},\n\nAs we celebrate ${festival.name}, we want to express our gratitude for your trust in us. May this festival illuminate your path to greater achievements.\n\nSincerely,\n[Your Company]`,
      ],
      friendly: [
        `Hey {name}! ${festival.emoji}\n\nHappy ${festival.name}! Hope you're celebrating with loved ones and creating wonderful memories. Thanks for being awesome!\n\nCheers,\n[Your Name]`,
        `Hi {name}!\n\nWishing you the happiest ${festival.name} ever! May your celebrations be filled with joy, laughter, and all the good vibes. You rock!\n\nBest,\n[Your Team]`,
        `${festival.emoji} Happy ${festival.name}, {name}!\n\nSending you tons of positive energy and good wishes today. Hope this festival brings you everything you're hoping for!\n\nWarmly,\n[Your Company]`,
      ],
      playful: [
        `🎉 {name}! ${festival.emoji}\n\nIt's ${festival.name} time! Let the celebrations begin! 🥳 We hope your day is as amazing as you are. Party on!\n\n✨ [Your Team]`,
        `Woohoo {name}! ${festival.emoji}\n\nHappy ${festival.name}! Time to celebrate, have fun, and make unforgettable memories! We're so glad to have you with us! 🎊\n\n[Your Squad]`,
        `Hey hey {name}! ${festival.emoji}\n\n${festival.name} vibes incoming! 🚀 May your day be filled with epic moments, good food, and even better company!\n\n💫 [Your Crew]`,
      ],
      premium: [
        `Distinguished {name},\n\nAs we honor the elegance of ${festival.name}, we extend our most refined wishes to you. May this celebration bring you unparalleled joy and prosperity.\n\nWith appreciation,\n[Your Brand]`,
        `Dear {name},\n\nIn the spirit of ${festival.name}, we wish you a celebration befitting your distinguished presence in our community. May excellence illuminate your path.\n\nGraciously,\n[Your Company]`,
        `{name},\n\nOn this auspicious occasion of ${festival.name}, we celebrate the privilege of your partnership. May this festival usher in a season of extraordinary success.\n\nRespectfully yours,\n[Your Team]`,
      ],
    }

    const messages = templates[brandVoice].map((template) => {
      let msg = template.replace(/{name}/g, recipientName)
      if (customField) {
        msg = msg.replace(/\[Your (Company|Team|Name|Brand|Squad|Crew)\]/g, customField)
      }
      if (prompt) {
        msg = msg + `\n\nP.S. ${prompt}`
      }
      return msg
    })

    setGeneratedMessages(messages)
  }

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const saveMessage = (message) => {
    if (!savedMessages.includes(message)) {
      setSavedMessages([...savedMessages, message])
    }
  }

  const sendToWhatsApp = async (message, index) => {
    // Validate phone number format (basic check for country code)
    if (!phoneNumber) {
      alert("Please enter a phone number with country code (e.g., 1234567890)")
      return
    }

    // Remove any non-digit characters from phone number
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '')
    
    // Basic validation for phone number (at least 10 digits)
    if (cleanPhoneNumber.length < 10) {
      alert("Please enter a valid phone number with country code")
      return
    }

    setSendingIndex(index)

    try {
      const response = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: cleanPhoneNumber,
          text: message,
        }),
      })

      const responseData = await response.json().catch(() => ({}))

      if (response.ok) {
        // Show success feedback
        setSentMessages(new Set([...sentMessages, index]))
        
        // Remove success indicator after 3 seconds
        setTimeout(() => {
          setSentMessages((prev) => {
            const newSet = new Set(prev)
            newSet.delete(index)
            return newSet
          })
        }, 3000)
      } else {
        // Show detailed error message from API if available
        const errorMessage = responseData.error || "Failed to send message"
        const errorDetails = responseData.details ? `\n\nDetails: ${JSON.stringify(responseData.details)}` : ''
        alert(`${errorMessage}${errorDetails}`)
        console.error("WhatsApp API error:", responseData)
      }
    } catch (error) {
      console.error("Network error:", error)
      alert("Network error. Please check your internet connection and try again.")
    } finally {
      setSendingIndex(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl font-bold text-white">WishFlow</h1>
          </div>
          <p className="text-blue-200 text-lg">
            Create culturally-intelligent, personalized holiday messages in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6" />
              Configure Your Message
            </h2>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Festival Region</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setRegion("indian")}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    region === "indian"
                      ? "bg-orange-500 text-white shadow-lg scale-105"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  🇮🇳 Indian Festivals
                </button>
                <button
                  onClick={() => setRegion("american")}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    region === "american"
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  🇺🇸 American Festivals
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Select Festival</label>
              <div className="grid grid-cols-2 gap-2">
                {festivals[region].map((festival) => (
                  <button
                    key={festival.id}
                    onClick={() => setSelectedFestival(festival.id)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      selectedFestival === festival.id
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {festival.emoji} {festival.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Recipient Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g., Rajesh Kumar"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                WhatsApp Number (with country code)
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., +919876543210"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <p className="text-xs text-white/60 mt-2">Include country code (e.g., +91 for India, +1 for US)</p>
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Relationship</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {relationships.map((rel) => (
                  <option key={rel.id} value={rel.id} className="bg-gray-800">
                    {rel.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Brand Voice</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(brandVoices).map(([key, voice]) => {
                  const Icon = voice.icon
                  return (
                    <button
                      key={key}
                      onClick={() => setBrandVoice(key)}
                      className={`p-4 rounded-lg transition-all ${
                        brandVoice === key
                          ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-900 shadow-lg scale-105"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-semibold">{voice.name}</div>
                      <div className="text-xs mt-1 opacity-80">{voice.desc}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Your Company/Name (Optional)</label>
              <input
                type="text"
                value={customField}
                onChange={(e) => setCustomField(e.target.value)}
                placeholder="e.g., Acme Corporation"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Additional Message (Optional)</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Looking forward to working together in 2025"
                rows="3"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              />
            </div>

            <button
              onClick={generateMessages}
              className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold rounded-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Generate Messages
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Generated Messages</h2>

            {generatedMessages.length === 0 ? (
              <div className="text-center py-20 text-white/50">
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Configure your message and click generate</p>
                <p className="text-sm mt-2">Your personalized wishes will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {generatedMessages.map((message, index) => (
                  <div
                    key={index}
                    className="bg-white/20 rounded-xl p-5 border border-white/30 hover:bg-white/25 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-semibold text-purple-300 bg-purple-900/50 px-3 py-1 rounded-full">
                        Option {index + 1}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => sendToWhatsApp(message, index)}
                          disabled={sendingIndex === index}
                          className="p-2 rounded-lg bg-green-600/30 hover:bg-green-600/50 text-green-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Send via WhatsApp"
                        >
                          {sendingIndex === index ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : sentMessages.has(index) ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => saveMessage(message)}
                          className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 transition-all"
                          title="Save to favorites"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(message, index)}
                          className="p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-300 transition-all"
                        >
                          {copiedIndex === index ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <p className="text-white whitespace-pre-wrap text-sm leading-relaxed">{message}</p>
                  </div>
                ))}

                <button
                  onClick={generateMessages}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate All
                </button>
              </div>
            )}

            {savedMessages.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Saved Favorites ({savedMessages.length})
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {savedMessages.map((msg, idx) => (
                    <div key={idx} className="bg-blue-900/30 rounded-lg p-3 border border-blue-400/30">
                      <p className="text-white text-xs whitespace-pre-wrap">{msg.substring(0, 100)}...</p>
                      <button
                        onClick={() => copyToClipboard(msg, `saved-${idx}`)}
                        className="mt-2 text-xs text-blue-300 hover:text-blue-100 flex items-center gap-1"
                      >
                        {copiedIndex === `saved-${idx}` ? (
                          <>
                            <Check className="w-3 h-3" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8 pb-8 text-white/60 text-sm">
          <p>✨ Powered by WishFlow • Creating meaningful connections, one message at a time</p>
        </div>
      </div>
    </div>
  )
}

export default WishFlow
