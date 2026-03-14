#!/usr/bin/env node

/**
 * 博客标题检查脚本
 * 检测 Markdown 文件的标题是否为纯英文，如果是则警告
 * 
 * 用法：
 *   node scripts/check-chinese-title.js                    # 检查所有文章
 *   node scripts/check-chinese-title.js content/article.md # 检查单篇文章
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '..', 'content');

// 检测是否包含中文字符
function hasChinese(text) {
  return /[\u4e00-\u9fa5]/.test(text);
}

// 提取标题
function extractTitle(content, filepath) {
  // 先尝试从 YAML Front Matter 中提取
  const fmMatch = content.match(/^---\s*\n(?:.*\n)*?title:\s*["']?(.+?)["']?\s*\n(?:.*\n)*?---\s*\n/);
  if (fmMatch) {
    return { title: fmMatch[1].trim(), type: 'front-matter' };
  }
  
  // 尝试从第一行 Markdown 标题中提取
  const firstLine = content.split('\n')[0];
  if (firstLine.startsWith('# ')) {
    return { title: firstLine.slice(2).trim(), type: 'markdown-h1' };
  }
  
  return { title: null, type: 'none' };
}

// 检查单个文件
function checkFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const { title, type } = extractTitle(content, filepath);
  
  if (!title) {
    return {
      file: filepath,
      status: 'warning',
      message: '⚠️  未找到标题',
      title: null
    };
  }
  
  if (!hasChinese(title)) {
    return {
      file: filepath,
      status: 'error',
      message: `❌ 纯英文标题：${title}`,
      title: title,
      suggestion: `建议添加中文标题，例如：【塔塔翻译】${title} 或 【塔塔笔记】${title}`
    };
  }
  
  return {
    file: filepath,
    status: 'ok',
    message: `✅ ${title}`,
    title: title
  };
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  let files = [];
  
  if (args.length > 0) {
    // 检查指定文件
    files = args.map(arg => {
      if (path.isAbsolute(arg)) return arg;
      return path.join(process.cwd(), arg);
    });
  } else {
    // 检查所有 Markdown 文件
    function walkDir(dir) {
      const results = [];
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullpath = path.join(dir, item);
        const stat = fs.statSync(fullpath);
        
        if (stat.isDirectory()) {
          results.push(...walkDir(fullpath));
        } else if (item.endsWith('.md')) {
          results.push(fullpath);
        }
      }
      
      return results;
    }
    
    files = walkDir(contentDir);
  }
  
  console.log(`🔍 检查 ${files.length} 个文件...\n`);
  
  const results = files.map(checkFile);
  
  const errors = results.filter(r => r.status === 'error');
  const warnings = results.filter(r => r.status === 'warning');
  const ok = results.filter(r => r.status === 'ok');
  
  // 输出结果
  console.log('='.repeat(60));
  console.log('检查结果:');
  console.log('='.repeat(60));
  
  if (errors.length > 0) {
    console.log(`\n❌ 发现 ${errors.length} 个纯英文标题:\n`);
    for (const err of errors) {
      console.log(`📄 ${path.basename(err.file)}`);
      console.log(`   ${err.message}`);
      console.log(`   💡 ${err.suggestion}\n`);
    }
  }
  
  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} 个文件未找到标题:\n`);
    for (const warn of warnings) {
      console.log(`📄 ${path.basename(warn.file)}\n`);
    }
  }
  
  console.log('='.repeat(60));
  console.log(`总计：${results.length} 个文件`);
  console.log(`✅ 正常：${ok.length}`);
  console.log(`❌ 错误：${errors.length}`);
  console.log(`⚠️  警告：${warnings.length}`);
  console.log('='.repeat(60));
  
  // 如果有错误，退出码为 1（用于 CI/CD）
  if (errors.length > 0) {
    console.log('\n💡 建议修复后再提交！');
    process.exit(1);
  }
}

main();
