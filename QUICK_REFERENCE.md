# 🚀 Quick Reference Guide - E-Rental System Role-Based UI

## 📌 Quick Links

| Document | Purpose |
|----------|---------|
| `IMPLEMENTATION_COMPLETE.md` | Full implementation details |
| `FRONTEND_ROLE_BASED_UI.md` | Original implementation guide |
| `FRONTEND_TOKEN_UPDATE.md` | Token update instructions |
| `TESTING_ROLE_RESTRICTIONS.md` | Backend testing scenarios |

---

## 🔑 Key Concepts

### User Roles
- **Buyer/Customer**: Can browse and book vehicles. Cannot list vehicles.
- **Owner**: Can list and manage vehicles. Cannot book vehicles.

### Token Management
- Backend generates NEW tokens when user registers as owner
- Frontend MUST update localStorage with new tokens immediately
- New tokens contain updated `typeOfCustomer` field

---

## 💻 Code Snippets

### Get User Role (Synchronous)
```javascript
import { getCachedUserRole } from '../utils/userRole';

const { role, isOwner, isBuyer } = getCachedUserRole();
// role: "Owner" | "Buyer" | null
// isOwner: boolean
// isBuyer: boolean
```

### Get User Role (Async - Fresh from Backend)
```javascript
import { getCurrentUser, getUserRole } from '../utils/userRole';

const user = await getCurrentUser();
const role = await getUserRole();
```

### Check Authentication
```javascript
import { isAuthenticated } from '../utils/userRole';

if (isAuthenticated()) {
  // User is logged in
}
```

### Cache User Data
```javascript
import { cacheUserData } from '../utils/userRole';

// After login or owner registration
cacheUserData(userData);
```

### Clear Cache on Logout
```javascript
import { clearUserCache } from '../utils/userRole';

clearUserCache();
// Removes: userData, user, accessToken, refreshToken
```

---

## 🎨 Conditional Rendering Patterns

### Pattern 1: Hide Feature for Owners
```javascript
{userRole === "Buyer" && (
  <button>Rent Now</button>
)}
```

### Pattern 2: Show Different Content by Role
```javascript
{userRole === "Owner" ? (
  <div>Owner-specific content</div>
) : (
  <div>Buyer-specific content</div>
)}
```

### Pattern 3: Check Authentication + Role
```javascript
{isAuthenticated && userRole === "Buyer" && (
  <button>Add to Cart</button>
)}
```

### Pattern 4: Show for Non-authenticated
```javascript
{!isAuthenticated && (
  <button onClick={() => navigate("/login")}>
    Login to Book
  </button>
)}
```

---

## 🛡️ Protected Routes

### Require Authentication
```javascript
<Route
  path="/some-path"
  element={
    <RequireAuth>
      <YourComponent />
    </RequireAuth>
  }
/>
```

### Owner Only
```javascript
<Route
  path="/vehicle/register"
  element={
    <OwnerOnlyRoute>
      <RegisterVehicle />
    </OwnerOnlyRoute>
  }
/>
```

### Buyer Only
```javascript
<Route
  path="/cart"
  element={
    <BuyerOnlyRoute>
      <CartPage />
    </BuyerOnlyRoute>
  }
/>
```

---

## 🔄 Common Operations

### After Login
```javascript
// 1. Store tokens
localStorage.setItem("accessToken", accessToken);
localStorage.setItem("refreshToken", refreshToken);
localStorage.setItem("isLoggedIn", "true");

// 2. Fetch and cache user data
const userResponse = await axios.get(
  `${API_URL}/user/current-user`,
  { headers: { Authorization: `Bearer ${accessToken}` } }
);
localStorage.setItem("userData", JSON.stringify(userResponse.data.data));
```

### After Owner Registration
```javascript
// Backend returns new tokens in response
const { accessToken, refreshToken, user } = response.data.data;

// Update localStorage immediately
localStorage.setItem("accessToken", accessToken);
localStorage.setItem("refreshToken", refreshToken);
localStorage.setItem("userData", JSON.stringify(user));
localStorage.setItem("user", JSON.stringify(user));
```

### On Logout
```javascript
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");
localStorage.removeItem("isLoggedIn");
localStorage.removeItem("userData");
localStorage.removeItem("user");
```

---

## 🎯 Component Patterns

### Navbar Component
```javascript
const [userRole, setUserRole] = useState(null);

useEffect(() => {
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    setUserRole(userData.typeOfCustomer);
  }
}, [location.pathname]);

// Conditional menu items
const navLinks = [
  ...baseNavLinks,
  ...(userRole === "Owner" ? [{ to: "/vehicle/register", label: "List Vehicle" }] : []),
];

// Conditional cart button
{userRole === "Buyer" && <CartButton />}
```

### Vehicle Card Component
```javascript
const [userType, setUserType] = useState(null);

useEffect(() => {
  const userInfo = JSON.parse(localStorage.getItem('user') || 'null');
  if (userInfo) {
    setUserType(userInfo.typeOfCustomer);
  }
}, []);

// Conditional button
{userType === "Owner" ? (
  <button disabled>Owner Account</button>
) : (
  <button onClick={handleRentNow}>Rent Now</button>
)}
```

### Vehicle Details Component
```javascript
const [userRole, setUserRole] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  setIsAuthenticated(!!localStorage.getItem("accessToken"));

  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    setUserRole(userData.typeOfCustomer);
  }
}, []);

// Conditional rendering
{isAuthenticated && userRole === "Buyer" && <BookButton />}
{isAuthenticated && userRole === "Owner" && <OwnerMessage />}
{!isAuthenticated && <LoginPrompt />}
```

---

## 🐛 Common Issues & Solutions

### Issue: Role not updating after owner registration
**Solution**: Ensure you're updating localStorage with new tokens from response
```javascript
const { accessToken, refreshToken } = response.data.data;
localStorage.setItem("accessToken", accessToken);
localStorage.setItem("refreshToken", refreshToken);
```

### Issue: Cart still showing for owners
**Solution**: Check if you're reading role from correct localStorage key
```javascript
const userDataString = localStorage.getItem("userData") || localStorage.getItem("user");
```

### Issue: Protected route not redirecting
**Solution**: Ensure ProtectedRoute component is properly wrapping the route
```javascript
<Route path="/cart" element={<BuyerOnlyRoute><CartPage /></BuyerOnlyRoute>} />
```

### Issue: Role state not persisting across pages
**Solution**: Read from localStorage in useEffect on every page
```javascript
useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  setUserRole(userData?.typeOfCustomer);
}, [location.pathname]);
```

---

## 📊 localStorage Structure

```javascript
{
  "accessToken": "eyJhbGc...", // JWT token
  "refreshToken": "eyJhbGc...", // JWT refresh token
  "isLoggedIn": "true", // String boolean
  "userData": "{\"_id\":\"...\",\"typeOfCustomer\":\"Owner\",...}", // JSON string
  "user": "{\"_id\":\"...\",\"typeOfCustomer\":\"Owner\",...}" // Duplicate for compatibility
}
```

---

## 🔍 Debugging Tips

### Check User Role
```javascript
console.log("User Role:", localStorage.getItem("userData"));
```

### Check Authentication
```javascript
console.log("Access Token:", localStorage.getItem("accessToken"));
console.log("Is Logged In:", localStorage.getItem("isLoggedIn"));
```

### Decode JWT Token
Use https://jwt.io to decode the token and see what's inside:
```javascript
const token = localStorage.getItem("accessToken");
// Paste into jwt.io to see: typeOfCustomer, _id, etc.
```

### Test Role Detection
```javascript
import { getCachedUserRole } from './utils/userRole';
console.log(getCachedUserRole());
// { role: "Owner", isOwner: true, isBuyer: false }
```

---

## 🎨 Color Guidelines

| Color | Usage | Example |
|-------|-------|---------|
| Blue/Purple Gradient | Buyer actions, primary CTAs | "Rent Now", "Book Vehicle" |
| Orange | Owner restrictions, warnings | "Owner Account", "Cannot book" |
| Red | Errors, unavailable states | "Vehicle Not Available" |
| Blue | Login prompts, info | "Login to Book" |
| Green | Success, available | "Available", Success messages |
| Gray | Disabled states | Disabled buttons |

---

## 🧪 Testing Checklist

### Quick Buyer Test
```bash
1. Login as buyer
2. Check: Cart button visible in navbar? ✓
3. Check: Can see "Rent Now" on vehicles? ✓
4. Check: Can access /cart page? ✓
5. Check: Cannot access /vehicle/register? ✓
```

### Quick Owner Test
```bash
1. Register as owner
2. Check: Tokens updated in localStorage? ✓
3. Check: "List Vehicle" visible in navbar? ✓
4. Check: Cart button hidden? ✓
5. Check: See "Owner Account" on vehicles? ✓
6. Check: Can access /vehicle/register? ✓
7. Check: Cannot access /cart? ✓
```

---

## 📱 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/user/login` | POST | Login user, returns tokens |
| `/user/current-user` | GET | Get current user data |
| `/owner/register-owner` | POST | Register as owner, returns NEW tokens |
| `/vehicle/register-vehicle` | POST | List a vehicle (Owner only) |
| `/booking/create-booking` | POST | Create booking (Buyer only) |
| `/cart/add-to-cart` | POST | Add to cart (Buyer only) |

---

## 🔗 Useful Commands

```bash
# Check if file exists
ls src/utils/userRole.js

# Search for token updates
grep -r "localStorage.setItem.*accessToken" src/

# Find all role checks
grep -r "typeOfCustomer" src/

# Find protected routes
grep -r "OwnerOnlyRoute\|BuyerOnlyRoute" src/
```

---

## 💡 Best Practices

1. **Always check role on mount**: Use useEffect to read from localStorage
2. **Listen for storage changes**: Handle cross-tab updates
3. **Clear cache on logout**: Remove all user data and tokens
4. **Show loading states**: While checking authentication
5. **Provide clear feedback**: Explain why actions are blocked
6. **Use synchronous checks**: For initial render (getCachedUserRole)
7. **Verify with async checks**: For critical operations (getCurrentUser)
8. **Handle edge cases**: Expired tokens, invalid data, etc.

---

## 🚀 Quick Start

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Set environment variables**: Create `.env` with `VITE_API_BASE_URL`
4. **Start development server**: `npm run dev`
5. **Test login**: Try buyer and owner accounts
6. **Verify role-based UI**: Check conditional rendering
7. **Test protected routes**: Try accessing owner/buyer-only pages

---

**Need More Help?**
- See `IMPLEMENTATION_COMPLETE.md` for full details
- See `FRONTEND_ROLE_BASED_UI.md` for implementation guide
- Check console logs for debugging info
- Test with different user roles

---

**Last Updated:** January 2025
**Status:** ✅ Ready for Use
