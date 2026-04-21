#!/usr/bin/env bash
set -euo pipefail

# تعديل فقط إذا أردت
GITHUB_USER="marwan191289-eng"
REPO_NAME="PeekboOo-playHouse"
CLEAN_REMOTE_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

# تأكد من وجود git
command -v git >/dev/null || { echo "Git not found. Install Git and retry."; exit 1; }

# تأكد أننا داخل مستودع git
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "Not a git repo. Run this inside your repo folder."; exit 1; }

# احصل على PAT من المتغير البيئي أو اطلبه من المستخدم (لن يظهر أثناء الكتابة)
if [ -z "${GITHUB_PAT:-}" ]; then
  printf "Enter GitHub Personal Access Token (PAT): "
  read -rs GITHUB_PAT
  echo
fi

# إزالة origin إن وُجد
if git remote get-url origin >/dev/null 2>&1; then
  git remote remove origin
fi

# أضف origin مؤقتًا مع التوكن (مشفر)
ENC_PAT=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=''))" "$GITHUB_PAT")
REMOTE_WITH_TOKEN="https://${ENC_PAT}@github.com/${GITHUB_USER}/${REPO_NAME}.git"
git remote add origin "$REMOTE_WITH_TOKEN"

# اكتشاف الفرع الحالي (استخدم main كافتراضي)
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")
if [ -z "$BRANCH" ] || [ "$BRANCH" = "HEAD" ]; then BRANCH="main"; fi
echo "Using branch: $BRANCH"

# إضافة وارتكاب التغييرات إن وُجدت
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "Commit from script $(date -u +"%Y-%m-%dT%H:%M:%SZ")" || true
fi

# جلب ومحاولة دمج/سحب
git fetch origin --prune || true
if ! git pull origin "$BRANCH" --no-edit 2>/dev/null; then
  echo "Normal pull failed — trying allow-unrelated-histories..."
  if ! git pull origin "$BRANCH" --allow-unrelated-histories --no-edit 2>/dev/null; then
    echo "Automatic pull failed. Resolve conflicts manually and re-run the script."; exit 1
  fi
fi

# دفع التغييرات
if ! git push -u origin "$BRANCH"; then
  echo "Push failed. Trying force push..."
  git push -u origin "$BRANCH" --force
fi

# تنظيف: استبدال الريموت لإزالة التوكن من الإعدادات المحلية
git remote set-url origin "$CLEAN_REMOTE_URL"

# مسح المتغير من الجلسة
unset GITHUB_PAT 2>/dev/null || true

echo "Done. Pushed to ${CLEAN_REMOTE_URL} on branch ${BRANCH}."
