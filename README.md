# Backend-Stripe-Movieline
Server till Movieline med Stripe API
* Node.js & Express

# Innehåll
* För att connecta med Stripe API byggdes denna backendservern med Express och Node.js. HTTP-requests hämtas och skickas med REST-APi: POST & GET. Från och till frontend-applikationen med data som behövs för att koppla upp till Stripe samt skapa order och verifiera köpet innan orderbekräftelse skickas och json.fil med orden skapas på servern.

* Länk till Github-repo Backend
https://github.com/sweets86/Backend-Stripe-Movieline

* Länk till Github-repo Frontend
https://github.com/sweets86/Stripe-Integration-Movieline

# För att köra applikationen
Ladda ner filerna från Github och kopiera innehållet i en ny mapp och öppna mappen i VSC. Du behöver ha node.js installerat på datorn. Öppna terminalen och skriv in npm install. Du kommer se att node_modules mappen läggs till. Du behöver en secretKey från din Stripe Dashboard, skapa en .env fil i root och lägg in detta: STRIPE_SECRET_KEY=[din secretkey här direkt efter =, inga mellanslag och inga hårdklamrar.]
Därefter skriver du in node app.js i terminalen. Nu bör du fått igång applikationen till port localhost:5000.
För Frontend efter npm install, skriver du npm start i terminalen. Nu bör du fått igång applikationen till port localhost:3000.