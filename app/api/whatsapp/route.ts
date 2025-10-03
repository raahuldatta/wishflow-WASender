import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const apiKey = process.env.WASENDER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "WASENDER_API_KEY is not configured in environment variables." }, { status: 500 })
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { to, text } = (payload as { to?: string; text?: string }) || {}
  if (!to || !text) {
    return NextResponse.json({ error: "Missing required fields: to, text" }, { status: 400 })
  }

  try {
    const wasenderRes = await fetch("https://wasenderapi.com/api/send-message", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, text }),
    })

    const responseText = await wasenderRes.text()
    // Try to parse JSON if possible; fall back to raw text
    let data: any
    try {
      data = JSON.parse(responseText)
    } catch {
      data = { raw: responseText }
    }

    if (!wasenderRes.ok) {
      return NextResponse.json({ error: "WASender API request failed", details: data }, { status: wasenderRes.status })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to reach WASender API", details: err?.message || "Unknown error" },
      { status: 502 },
    )
  }
}
