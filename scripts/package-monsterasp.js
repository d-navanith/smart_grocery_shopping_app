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
  `// MonsterASP.NET / IISNode Root Entrypoint
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
require('./dist/index.js');
`
);

// 5. Create MonsterASP.NET web.config
const webConfigContent = `<?xml version="1.0" encoding="utf-8"?>
<!-- MonsterASP.NET IIS Configuration for Ceylon Foods Full-Stack Node.js Application -->
<configuration>
  <system.webServer>
    <!-- Configure iisnode to handle root index.js -->
    <handlers>
      <add name="iisnode" path="index.js" verb="*" modules="iisnode" />
    </handlers>

    <!-- Rewrite all incoming requests to index.js so Express handles routing -->
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^index.js\\/debug[\\/]?" />
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True" />
          </conditions>
          <action type="Rewrite" url="index.js" />
        </rule>
      </rules>
    </rewrite>

    <!-- Hide sensitive files from direct web browsing -->
    <security>
      <requestFiltering>
        <hiddenSegments>
          <add segment="node_modules" />
          <add segment="iisnode" />
          <add segment=".git" />
        </hiddenSegments>
      </requestFiltering>
    </security>

    <!-- iisnode options for production logging and resilience -->
    <iisnode
      node_env="production"
      debuggingEnabled="false"
      loggingEnabled="true"
      logDirectory="iisnode"
      maxLogFileSizeInKB="2048"
      watchedFiles="web.config;index.js;dist\\*.js"
    />
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
