# Use the official Nginx image
FROM nginx:latest

# Copy website files into Nginx's web root
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]