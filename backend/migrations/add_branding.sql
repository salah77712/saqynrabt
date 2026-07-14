-- Add branding and AI persona configurations to companies table
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS branding JSONB DEFAULT '{
  "logo_url": "",
  "primary_color_hex": "#141F33",
  "secondary_color_hex": "#2A5CFF",
  "font_family": "Inter",
  "chat_bot_name": "SAQYN Assistant",
  "chat_bot_avatar_url": ""
}',
ADD COLUMN IF NOT EXISTS ai_persona JSONB DEFAULT '{
  "greeting": "Hello! How can I assist you today?",
  "tone": "professional",
  "system_prompt_overrides": ""
}';
