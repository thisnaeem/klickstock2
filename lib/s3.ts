import { PutObjectCommand, S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Configure AWS S3 client
const s3Client = new S3Client({
  region: process.env.NAWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.NAWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.NAWS_SECRET_ACCESS_KEY || '',
  },
});

// Function to upload image to AWS S3
export async function uploadImageToS3(
  file: Buffer,
  folderName: string,
  fileName: string
): Promise<string> {
  // Generate a unique key for the file
  const key = `${folderName}/${Date.now()}-${fileName}`;
  
  // Set up the upload parameters
  const params = {
    Bucket: process.env.NAWS_BUCKET_NAME || '',
    Key: key,
    Body: file,
    ContentType: 'image/jpeg', // Adjust content type as needed
  };

  try {
    // Upload file to S3
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    
    // Create a signed URL or direct URL to the uploaded file
    const fileUrl = `https://${params.Bucket}.s3.${process.env.NAWS_REGION || 'us-east-1'}.amazonaws.com/${params.Key}`;
    
    return fileUrl;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw error;
  }
}

// Function to generate a pre-signed URL for direct browser upload
export async function getPresignedUploadUrl(
  folderName: string,
  fileName: string,
  contentType: string = 'image/jpeg'
): Promise<{ url: string; key: string }> {
  // Generate a unique key for the file
  const key = `${folderName}/${Date.now()}-${fileName}`;
  
  // Set up the upload parameters
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME || '',
    Key: key,
    ContentType: contentType,
  };

  try {
    // Create a command for putting an object in the bucket
    const command = new PutObjectCommand(params);
    
    // Generate a pre-signed URL that expires in 15 minutes
    const url = await getSignedUrl(s3Client, command, { expiresIn: 900 });
    
    return { url, key };
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    throw error;
  }
}

// Function to generate a pre-signed URL for reading an S3 object
export async function getSignedReadUrl(key: string): Promise<string> {
  const params = {
    Bucket: process.env.NAWS_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME || '',
    Key: key,
  };

  try {
    // Create a command for getting an object from the bucket
    const command = new GetObjectCommand(params);
    
    // Generate a pre-signed URL that expires in 1 hour
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    
    return url;
  } catch (error) {
    console.error('Error generating signed read URL:', error);
    throw error;
  }
}

// Function to extract S3 key from a full S3 URL
export function extractS3Key(url: string): string | null {
  try {
    // Handle different S3 URL formats:
    // 1. https://bucket-name.s3.region.amazonaws.com/key
    // 2. https://s3.region.amazonaws.com/bucket-name/key
    // 3. https://bucket-name.s3.amazonaws.com/key
    
    const urlObj = new URL(url);
    
    // Format 1: bucket-name.s3.region.amazonaws.com
    if (urlObj.hostname.includes('.s3.') && urlObj.hostname.includes('.amazonaws.com')) {
      return urlObj.pathname.slice(1); // Remove leading slash
    }
    
    // Format 2: s3.region.amazonaws.com/bucket-name/key
    if (urlObj.hostname.startsWith('s3.') && urlObj.hostname.includes('.amazonaws.com')) {
      const pathParts = urlObj.pathname.split('/');
      if (pathParts.length > 2) {
        return pathParts.slice(2).join('/'); // Remove empty string and bucket name
      }
    }
    
    // If none of the above formats match, return the pathname without leading slash
    return urlObj.pathname.slice(1);
  } catch (error) {
    console.error('Error extracting S3 key from URL:', error);
    return null;
  }
}