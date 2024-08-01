# Gunakan image Node.js resmi sebagai base image
FROM node:16

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Instal dependensi aplikasi
RUN npm install

# Salin semua file aplikasi ke dalam container
COPY . .

# Expose port yang akan digunakan oleh aplikasi
EXPOSE 9000

# Jalankan aplikasi saat container dimulai
CMD ["npm", "start"]
