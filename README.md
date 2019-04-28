# DB設計

## messages table

| Column   | Type       | Options                        |
| -------- | ---------- | ------------------------------ |
| body     | text       |
| image    | string     |
| user_id  | references | null: false, foreign_key: true |
| group_id | references | null: false, foreign_key: true |

### Association

- belongs_to :user
- belongs_to :group

## users table

| Column | Type   | Options                  |
| ------ | ------ | ------------------------ |
| name   | string | null false, unique: true |
| email  | string | null false, unique: true |

### Association

- has_many :messages
- has_many :groups, through: :groups_users
- has_many :groups_users

## groups table

| Column | Type   | Options    |
| ------ | ------ | ---------- |
| name   | string | null false |

### Association

- has_many :messages
- has_many :users, through: :groups_users
- has_many :groups_users

## groups_users table

| Column   | Type       | Options                       |
| -------- | ---------- | ----------------------------- |
| user_id  | references | null false, foreign_key: true |
| group_id | references | null false, foreign_key: true |

### Association

- belongs_to :user
- belongs_to :group
