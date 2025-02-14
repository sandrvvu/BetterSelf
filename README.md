# BetterSelf

## Database Schema

```mermaid
erDiagram
   users {
      int id PK
      citext email
      varchar name
      varchar password
      dateTime created_at
      dateTime updated_at
   }
```