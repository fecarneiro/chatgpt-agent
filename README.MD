# Persistent chat agent

## Database

Mandatory initial content for `chat.History.json` (lowdb):

```json
{
  "chatHistory": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    }
  ]
}
```
