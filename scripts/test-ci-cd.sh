#!/bin/bash

# CI/CD Test Script
# Tests all the commands that run in the GitHub Actions workflows

echo "🚀 Testing CI/CD Pipeline Commands"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to run command and check result
run_test() {
    local test_name="$1"
    local command="$2"

    echo -e "\n${YELLOW}🔍 Testing: $test_name${NC}"
    echo "Command: $command"

    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASSED: $test_name${NC}"
        return 0
    else
        echo -e "${RED}❌ FAILED: $test_name${NC}"
        return 1
    fi
}

# Track failures
failures=0

# Install dependencies
echo -e "\n${YELLOW}📦 Installing dependencies...${NC}"
npm ci

# Test 1: Linting
if ! run_test "ESLint" "npm run lint"; then
    ((failures++))
    echo "  → Run 'npm run lint:fix' to auto-fix issues"
fi

# Test 2: Type checking
if ! run_test "TypeScript Build" "npm run build"; then
    ((failures++))
    echo "  → Check for TypeScript errors in your code"
fi

# Test 3: Testing
if ! run_test "Test Suite" "npm run test:run"; then
    ((failures++))
    echo "  → Run 'npm run test' to see detailed test results"
fi

# Test 4: Test Coverage
if ! run_test "Test Coverage" "npm run test:coverage"; then
    ((failures++))
    echo "  → Some tests may be failing or coverage is too low"
fi

# Summary
echo -e "\n${YELLOW}📊 Summary${NC}"
echo "=========="

if [ $failures -eq 0 ]; then
    echo -e "${GREEN}🎉 All CI/CD checks passed! Your code is ready for deployment.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Commit and push your changes"
    echo "2. Create a pull request"
    echo "3. GitHub Actions will run these same tests"
    echo "4. If all tests pass, merge will trigger deployment to Vercel"
else
    echo -e "${RED}❌ $failures test(s) failed. Fix the issues above before pushing.${NC}"
    exit 1
fi
