const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const DEPLOY_DIR = path.resolve(ROOT_DIR, 'deploy_monsterasp');
const ZIP_PATH = path.resolve(ROOT_DIR, 'deploy_monsterasp.zip');

console.log('🚀 Starting MonsterASP.NET Deployment Package Build...\n');

// 1. Build all 3 workspaces
console.log('📦 Step 1: Building Client, Admin, and Server...');
execSync('npm --prefix client run build', { cwd: ROOT_DIR, stdio: 'inherit' });
execSync('npm --prefix admin run build', { cwd: ROOT_DIR, stdio: 'inherit' });
execSync('npm --prefix server run build', { cwd: ROOT_DIR, stdio: 'inherit' });

// 2. Prepare deploy directory
console.log('\n🧹 Step 2: Preparing deploy_monsterasp directory...');
if (fs.existsSync(DEPLOY_DIR)) {
  fs.rmSync(DEPLOY_DIR, { recursive: true, force: true });
}
if (fs.existsSync(ZIP_PATH)) {
  fs.unlinkSync(ZIP_PATH);
}
fs.mkdirSync(DEPLOY_DIR, { recursive: true });
fs.mkdirSync(path.join(DEPLOY_DIR, 'public', 'client'), { recursive: true });
fs.mkdirSync(path.join(DEPLOY_DIR, 'public', 'admin'), { recursive: true });

// Helper to copy directory recursively
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 3. Copy builds
console.log('📂 Step 3: Copying build artifacts...');
copyDirSync(path.join(ROOT_DIR, 'server', 'dist'), path.join(DEPLOY_DIR, 'dist'));
copyDirSync(path.join(ROOT_DIR, 'client', 'dist'), path.join(DEPLOY_DIR, 'public', 'client'));
copyDirSync(path.join(ROOT_DIR, 'admin', 'dist'), path.join(DEPLOY_DIR, 'public', 'admin'));

// 4. Create root entrypoint index.js
console.log('📄 Step 4: Writing root index.js and web.config...');
fs.writeFileSync(
  path.join(DEPLOY_DIR, 'index.js'),
  `// MonsterASP.NET / httpPlatformHandler Root Entrypoint
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
require('./dist/index.js');
`
);

// Ensure logs directory exists for stdout/stderr logs
fs.mkdirSync(path.join(DEPLOY_DIR, 'logs'), { recursive: true });

// 5. Create MonsterASP.NET web.config (Clean Native httpPlatformHandler for Node.js + Hardened Security)
const webConfigContent = `<?xml version="1.0" encoding="utf-8"?>
<!-- MonsterASP.NET IIS Configuration for Ceylon Foods Full-Stack Node.js Application -->
<configuration>
  <system.webServer>
    <handlers>
      <add name="httpPlatformHandler" path="*" verb="*" modules="httpPlatformHandler" resourceType="Unspecified" />
    </handlers>
    <httpPlatform processPath="node" arguments=".\\index.js" startupTimeLimit="60" stdoutLogEnabled="true" stdoutLogFile=".\\logs\\node">
      <environmentVariables>
        <environmentVariable name="PORT" value="%HTTP_PLATFORM_PORT%" />
        <environmentVariable name="NODE_ENV" value="production" />
      </environmentVariables>
    </httpPlatform>
    <httpProtocol>
      <customHeaders>
        <remove name="X-Powered-By" />
        <add name="X-Content-Type-Options" value="nosniff" />
        <add name="X-Frame-Options" value="SAMEORIGIN" />
        <add name="X-XSS-Protection" value="1; mode=block" />
        <add name="Referrer-Policy" value="strict-origin-when-cross-origin" />
        <add name="Permissions-Policy" value="camera=(), microphone=(), geolocation=()" />
      </customHeaders>
    </httpProtocol>
    <security>
      <requestFiltering removeServerHeader="true" />
    </security>
  </system.webServer>
</configuration>
`;
fs.writeFileSync(path.join(DEPLOY_DIR, 'web.config'), webConfigContent);

// 6. Create production package.json
console.log('📦 Step 5: Generating production package.json...');
const prodPackage = {
  name: 'ceylon-foods-romania',
  version: '1.0.0',
  private: true,
  description: 'Ceylon Foods Romania - Smart Supermarket Platform',
  main: 'index.js',
  scripts: {
    start: 'node index.js'
  },
  dependencies: {
    cors: '^2.8.5',
    dotenv: '^16.4.5',
    express: '^4.19.2',
    zod: '^3.23.8'
  }
};
fs.writeFileSync(
  path.join(DEPLOY_DIR, 'package.json'),
  JSON.stringify(prodPackage, null, 2)
);

// 7. Install production node_modules
console.log('\n📥 Step 6: Installing production dependencies into deploy package...');
execSync('npm install --omit=dev --no-audit --no-fund', {
  cwd: DEPLOY_DIR,
  stdio: 'inherit'
});

// 8. Create ZIP archive
console.log('\n🗜️ Step 7: Creating deploy_monsterasp.zip for one-click upload...');
try {
  execSync(
    `powershell -Command "Compress-Archive -Path '${DEPLOY_DIR}\\*' -DestinationPath '${ZIP_PATH}' -Force"`,
    { stdio: 'inherit' }
  );
  console.log(`\n🎉 SUCCESS! Deployment package created:`);
  console.log(`👉 Folder: ${DEPLOY_DIR}`);
  console.log(`👉 Ready-to-upload Zip: ${ZIP_PATH}`);
} catch (err) {
  console.warn('Could not auto-zip with powershell, files are ready in deploy_monsterasp/ directory.');
}
