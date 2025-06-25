## 🔐 API Features

- 🔒 *JWT Authentication*:
  - Generate token on login
  - Protect private routes using JWT
  - Tokens stored in HttpOnly cookies

- 📦 *Food Item Management (CRUD)*:
  - Create a new food item
  - Get all foods for logged-in user
  - Update / Delete food (only by owner)
  - Nearly expired / expired food logic

- 🧠 *Role-based Access (Optional Enhancement)*:
  - Admin/User logic via token verification

---

## 🔧 Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/food-expiry-tracker-server
| Method | Endpoint     | Description                        | Access    |
| ------ | ------------ | ---------------------------------- | --------- |
| GET    | /foods     | Get all foods by user email        | Protected |
| POST   | /foods     | Add new food                       | Protected |
| PUT    | /foods/:id | Update a specific food             | Protected |
| DELETE | /foods/:id | Delete a specific food             | Protected |
| GET    | /expired   | Get expired or nearly expired food | Protected |
| POST   | /jwt       | Generate JWT Token                 | Public    |
