import fs from 'fs'
import path from 'path'

import fetch from 'node-fetch'

const SHA = process.env.COMMIT_SHA


const { GITHUB_REPOSITORY } = process.env

async function getCommitInfo() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/Derick80/spd-stack/commits/${SHA}`,
    )
    const data = await response.json()
console.log(data,'data');
    return {
      author: data.commit.author.name,
      timestamp: data.commit.author.date,
      sha: data.sha,
      message: data.commit.message,
      url: data.html_url,
    }
  } catch (e) {
    console.error(`💣 fetch failed with ${e.message}`)
  }
}

async function run() {
  const data = {
    timestamp: Date.now(),
    data: await getCommitInfo(),
  }

  fs.writeFileSync(
    path.resolve('../public/build/info.json'),
    JSON.stringify(data, null, 2),
  )
}
run()
