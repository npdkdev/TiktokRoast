import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { message: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const profile = await getTiktokProfile(username);
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching Tiktok profile:", error);
    return NextResponse.json(
      { message: "Error fetching Tiktok profile" },
      { status: 500 }
    );
  }
}

async function getTiktokProfile(username: string) {

  const profileUrl = `https://www.tiktok.com/@${username.replace(/@/g, '')}/`;
  const response = await axios.get(profileUrl);
  const $ = cheerio.load(response.data);

  const profile: any = {};
  const jsonString = $('#__UNIVERSAL_DATA_FOR_REHYDRATION__').html();

  // Parse the JSON string into a JavaScript object
  const jsonData = JSON.parse(jsonString);
  const dataJson = jsonData.__DEFAULT_SCOPE__
  const userDetail = dataJson['webapp.user-detail'].userInfo;
  if (!userDetail) {
    throw new Error('Pengguna tidak ditemukan')
  }
  profile.name = userDetail['user']['nickname']
  profile.username = userDetail['user']['uniqueId']
  profile.bio = userDetail['user']['signature']
  profile.created_at = userDetail['user']['createdTime']
  profile.avatar = userDetail['user']['avatarMedium']
  profile.verified = userDetail['user']['verified']
  profile.is_private = userDetail['user']['privateAccount']
  profile.last_modified_name = userDetail['user']['nickNameModifyTime']
  // profile.stats = userDetail['stats']
  profile.followers = userDetail['stats'].followerCount
  profile.following = userDetail['stats'].followingCount
  profile.likes = userDetail['stats'].heart
  profile.videos = userDetail['stats'].videoCount
  profile.friends = userDetail['stats'].friendCount
  return profile;
}

