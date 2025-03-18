# BetterSelf

## Database Schema

```mermaid
erDiagram
   user {
      uuid id PK
      citext email
      varchar name
      varchar password
      timestamp createdAt
      timestamp updatedAt
   }

   category {
      uuid id PK
      varchar name
      text description
      uuid userId
      timestamp createdAt
      timestamp updatedAt
   }

   goal {
      uuid id PK
      varchar title
      text description
      enum priority
      enum status
      uuid categoryId
      date targetDate
      int progress
      timestamp createdAt
      timestamp updatedAt
   }

   task {
      uuid id PK
      varchar title
      text description
      int importance
      int urgency
      int difficulty
      int successProbability
      text(array) dependencies
      enum status
      uuid goalId
      date targetDate
      double estimatedTime
      enum estimatedTimeUnit
      timestamp createdAt
      timestamp updatedAt
   }

   entry {
      uuid id PK
      varchar title
      text content
      uuid userId
      uuid goalId
      timestamp createdAt
      timestamp updatedAt
   }

   image {
        uuid id PK
        varchar source
        timestamp createdAt
        timestamp updatedAt
   }

   vision_board {
        uuid id PK
        varchar title
        text description
        uuid userId FK
        uuid goalId FK
        timestamp createdAt
        timestamp updatedAt
   }

   board_to_image {
        uuid id PK
        uuid imageId FK
        uuid visionBoardId FK
        timestamp createdAt
   }

   user ||--|{ category : userId
   user ||--|{ entry : userId
   user ||--|{ vision_board : userId
   category ||--|{ goal : categoryId
   board_to_image ||--|| image : imageId
   board_to_image ||--|| vision_board : visionBoardId
   goal ||--|{ task : goalId
   goal ||--|{ vision_board : goalId
   goal ||--|{ entry : goalId
```
