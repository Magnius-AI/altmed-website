# AI Chatbot Integration Plan
**For: AltMed Medical Center Website**
**Goal:** Automated lead capture, triage, and booking assistance 24/7
**Date:** 2026-02-02

---

## Platform Comparison

| Feature | Tidio | Chatbot.com | Drift | Custom (OpenClaw) |
|---------|-------|-------------|-------|-------------------|
| **Free Tier** | 100 chats/month | 1,000 chats/month | No free tier | Unlimited |
| **AI Capabilities** | Basic | Advanced | Advanced | Full control (GPT-4) |
| **Cost (Paid)** | $29/month | $52/month | $2,500/month | $0 (usage only) |
| **Setup Time** | 15 minutes | 30 minutes | 1 hour | 2-3 hours |
| **Customization** | Limited | Moderate | High | Complete |
| **HIPAA Compliance** | No | No | Yes ($$$) | Can be configured |

**Recommendation:** Start with **Chatbot.com** (1,000 free chats), migrate to **custom OpenClaw bot** when volume exceeds free tier.

---

## Option 1: Chatbot.com (Quick Start)

### Setup Steps

1. **Create account** at https://www.chatbot.com
2. **Install widget** on website:

```html
<!-- Add to /altmed-website/index.html before </body> -->
<script>
  window.__be = window.__be || {};
  window.__be.id = "YOUR_CHATBOT_ID";
  (function() {
    var be = document.createElement('script'); be.type = 'text/javascript'; be.async = true;
    be.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.chatbot.com/widget/plugin.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(be, s);
  })();
</script>
```

3. **Build conversation flows** (see below)
4. **Connect integrations:**
   - Mailchimp (email capture)
   - Google Sheets (lead database)
   - Calendly/PatientFusion (booking)
   - Slack/Discord (clinic notifications)

---

## Conversation Flows

### Flow 1: Welcome & Triage

```yaml
Trigger: User opens chat

Bot: 👋 Welcome to AltMed Medical Center! How can I help you today?

Buttons:
  - Schedule Appointment
  - DOT Physical Info
  - Corporate Services
  - Talk to Someone

# Branch: Schedule Appointment
→ Bot: Great! What service do you need?
  Buttons:
    - DOT Physical ($100)
    - Primary Care Visit
    - Drug/Alcohol Test
    - Weight Loss Consultation
    - Other

→ Capture: Name, Phone, Email, Preferred Date/Time

→ Bot: Perfect! I've sent your info to our team. 
       You'll get a confirmation call within 30 minutes.
       
       Or book instantly online: [PatientFusion Link]

→ Action: 
  - Add to Google Sheets
  - Send SMS to clinic staff
  - Add to email sequence

# Branch: DOT Physical Info
→ Bot: Our DOT physicals are fast, affordable, and same-day!
       
       ✅ Walk-ins welcome
       ✅ Results in 30 minutes
       ✅ Medical card issued on-site
       ✅ $100 (most competitive)
       
       What would you like to know?
  Buttons:
    - What to Bring
    - Schedule Now
    - Pricing
    - Location

# Branch: Corporate Services
→ Bot: Are you looking for employee health services for your company?
  Buttons:
    - Yes, for my fleet/drivers
    - Yes, for corporate wellness
    - Tell me more

→ If "fleet/drivers":
  Bot: Perfect! We specialize in DOT compliance for trucking, 
       utilities, and fleet companies.
       
       Our DriverHub platform handles:
       • Driver medical card tracking
       • Automated expiration alerts
       • Compliance reporting
       • Online driver scheduling
       
       Can I get your info for a quick demo?
       
→ Capture: Company Name, Contact Name, Phone, Email, Fleet Size

→ Action:
  - Create DriverHub company record
  - Send demo request to sales team
  - Add to corporate email sequence

# Branch: Talk to Someone
→ Bot: No problem! Our team is available:
       
       📞 Call: (703) 361-4357
       📧 Email: info@altmedfirst.com
       
       Hours:
       Mon-Fri: 8am - 6pm
       Saturday: 9am - 2pm
       
       Or leave your number and we'll call you back:
       
→ Capture: Name, Phone
→ Action: Send urgent notification to clinic
```

### Flow 2: Returning Patient

```yaml
Trigger: User visits within 90 days

Bot: Welcome back to AltMed! 👋
     
     What brings you in today?

Buttons:
  - Schedule Another Appointment
  - Check Test Results
  - Pay Invoice
  - Other

# Branch: Check Test Results
→ Bot: For patient privacy, please call us to access results:
       (703) 361-4357
       
       Or check your patient portal: [Link]

# Branch: Pay Invoice
→ Bot: I can help with that! Do you have your invoice number?
→ Capture: Invoice Number (or Name + DOB)
→ Bot: [Generate Payment Link]
       Pay securely here: [Stripe Payment Link]
```

### Flow 3: After-Hours

```yaml
Trigger: Chat opened outside business hours

Bot: Thanks for reaching out! We're currently closed.
     
     📅 We'll be back:
     [Show next open time]
     
     For urgent medical needs, call 911 or visit:
     Sentara Northern Virginia Medical Center
     2300 Opitz Blvd, Woodbridge, VA
     
     For non-urgent scheduling, I can help now:
     
Buttons:
  - Schedule Appointment
  - Leave Message
  - Get Directions
```

---

## Option 2: Custom OpenClaw Chatbot (Advanced)

### Why Build Custom?

- **Full control** over AI personality and responses
- **HIPAA compliance** (self-hosted, encrypted)
- **Unlimited conversations** (pay only OpenAI API costs ~$0.002/chat)
- **Integration with DriverHub** (seamless data flow)
- **Multi-language support** (English + Spanish)

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Website Visitor                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Chat Widget (React Component)               │
│  • Message input/output                                  │
│  • Typing indicators                                     │
│  • Quick reply buttons                                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼ (HTTP/WebSocket)
┌─────────────────────────────────────────────────────────┐
│              OpenClaw Agent (Jarvis)                     │
│  • GPT-4 powered responses                               │
│  • Context-aware (page visited, previous chats)          │
│  • Tool calls:                                           │
│    - Check availability (calendar)                       │
│    - Create appointment (DriverHub API)                  │
│    - Send email/SMS                                      │
│    - Lookup patient info                                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Backend Systems                             │
│  • DriverHub (appointments, companies, drivers)          │
│  • Email (SendGrid)                                      │
│  • SMS (Twilio)                                          │
│  • CRM (Airtable/Google Sheets)                          │
└─────────────────────────────────────────────────────────┘
```

### Implementation

**File: `/src/components/ChatWidget.jsx`**

```jsx
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Send to OpenClaw backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          context: {
            page: window.location.pathname,
            referrer: document.referrer,
          }
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please call us at (703) 361-4357.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 flex items-center justify-center z-50"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-white rounded-xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div>
              <h3 className="font-semibold">AltMed Assistant</h3>
              <p className="text-xs opacity-90">Typically replies instantly</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

**Backend API Endpoint: `/api/chat`**

```javascript
// This would call OpenClaw agent with the conversation context
router.post('/chat', async (req, res) => {
  const { messages, context } = req.body;

  // Call OpenClaw sessions_send or spawn dedicated chatbot agent
  const response = await fetch('http://localhost:3333/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: messages[messages.length - 1].content,
      context: {
        conversationHistory: messages.slice(0, -1),
        page: context.page,
        referrer: context.referrer,
      },
    }),
  });

  const data = await response.json();
  res.json({ message: data.reply });
});
```

**OpenClaw Agent Persona (altmed-chatbot)**

```yaml
name: AltMed Chatbot
model: openai/gpt-4o-mini  # Fast + cheap for chat
thinking: false
persona: |
  You are the AltMed Medical Center chatbot assistant. 
  
  TONE: Friendly, professional, helpful. Medical expertise without jargon.
  
  CORE TASKS:
  1. Help visitors schedule appointments
  2. Answer questions about services (DOT physicals, drug tests, primary care)
  3. Collect leads (name, phone, email) when appropriate
  4. Direct urgent medical issues to 911
  5. Provide clinic info (hours, location, pricing)
  
  TOOLS AVAILABLE:
  - check_availability(service, date)
  - create_appointment(name, phone, service, datetime)
  - send_sms(phone, message)
  - send_email(email, template)
  
  GUIDELINES:
  - Always be HIPAA compliant (no PII in logs)
  - For test results, direct to phone call or patient portal
  - Capture leads when interest is shown
  - Escalate complex medical questions to staff
  - Provide pricing transparently: DOT Physical $100, Drug Test $50, etc.
  
  LOCATION:
  AltMed Medical Center
  8551 Rixlew Lane, Suite 140
  Manassas, VA 20109
  Phone: (703) 361-4357
  
  HOURS:
  Monday-Friday: 8am - 6pm
  Saturday: 9am - 2pm
  Sunday: Closed
```

---

## Bilingual Support (English + Spanish)

### Detect Language

```javascript
// Auto-detect based on first message
const detectLanguage = (message) => {
  const spanishKeywords = [
    'hola', 'buenos', 'necesito', 'ayuda', 'cita', 'español'
  ];
  
  const isSpanish = spanishKeywords.some(word => 
    message.toLowerCase().includes(word)
  );
  
  return isSpanish ? 'es' : 'en';
};
```

### Spanish Responses

**Welcome:**
```
¡Bienvenido a AltMed Medical Center! ¿Cómo puedo ayudarle hoy?

Botones:
- Programar una Cita
- Información sobre Físico DOT
- Servicios Corporativos
- Hablar con Alguien
```

---

## Integration with DriverHub

When chatbot creates an appointment for a DOT service:

```javascript
// Tool: create_dot_appointment
async function createDOTAppointment({ name, phone, email, companyName, datetime }) {
  // 1. Create driver record in DriverHub
  const driver = await fetch('http://localhost:3001/api/drivers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      phone,
      email,
      companyName: companyName || 'Walk-in',
    }),
  }).then(r => r.json());

  // 2. Create appointment
  const appointment = await fetch('http://localhost:3001/api/appointments', {
    method: 'POST',
    body: JSON.stringify({
      driverId: driver.id,
      service: 'DOT Physical',
      datetime,
      status: 'Scheduled',
    }),
  }).then(r => r.json());

  // 3. Send confirmation SMS
  await sendSMS(phone, `
    Appointment confirmed!
    Service: DOT Physical
    Date: ${datetime}
    Location: 8551 Rixlew Ln, Manassas, VA
    AltMed Medical Center
  `);

  return appointment;
}
```

---

## Analytics & Optimization

Track chatbot performance:

| Metric | Goal | Tracking Method |
|--------|------|-----------------|
| Chat engagement rate | >15% | Google Analytics event |
| Lead capture rate | >30% | Conversations → Leads with contact info |
| Appointment conversion | >10% | Leads → Booked appointments |
| Average resolution time | <3 min | Time from first to last message |
| User satisfaction | >4.5/5 | Post-chat survey |

---

## Next Steps

1. **Week 1:** Set up Chatbot.com (quick start)
2. **Week 2:** Build conversation flows + test
3. **Week 3:** Integrate with email/SMS automation
4. **Week 4:** Add Spanish language support
5. **Month 2:** Build custom OpenClaw chatbot (advanced features)

---

## Cost Estimate

**Option 1 (Chatbot.com):**
- Free tier: 0-1,000 chats/month
- Paid tier: $52/month for unlimited

**Option 2 (Custom OpenClaw):**
- OpenAI API: ~$0.002/chat × 1,000 chats = $2/month
- Hosting: $0 (same server as website/DriverHub)
- Total: **~$2/month** 🎯

**Winner:** Custom OpenClaw chatbot for cost + control once traffic grows.
