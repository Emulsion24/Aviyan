
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
export async function verifyAuth(request) {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return {
      success: false,
      error: 'Unauthorized',
      message: 'No authentication token found',
      status: 401,
    };
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return {
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or expired token',
      status: 401,
    };
  }

 
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId || decoded.id },
    select: { id: true, email: true }, // or select { role: true }
  });

  if (!user) {
    return {
      success: false,
      error: 'Unauthorized',
      message: 'User not found',
      status: 401,
    };
  }
  
  
  return { success: true, user: decoded }; 
 
}