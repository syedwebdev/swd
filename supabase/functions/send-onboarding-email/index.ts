const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured')

    const data = await req.json()

    const html = `
      <h2>New Website Onboarding Request</h2>
      <table style="border-collapse:collapse;width:100%">
        ${Object.entries(data).map(([key, val]) => `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold;text-transform:capitalize">${key.replace(/([A-Z])/g, ' $1')}</td>
            <td style="padding:8px;border:1px solid #ddd">${Array.isArray(val) ? val.join(', ') : val}</td>
          </tr>
        `).join('')}
      </table>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Website Onboarding <onboarding@resend.dev>',
        to: ['syedwebdesigndevelopers@gmail.com'],
        subject: `[New Client] ${data.fullName} - ${data.businessName}`,
        html,
        reply_to: data.email,
      }),
    })

    const result = await res.json()
    if (!res.ok) throw new Error(result.message || 'Failed to send email')

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
