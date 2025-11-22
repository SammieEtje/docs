#!/bin/bash
#
# Tests for generate_docs.sh script
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "Testing generate_docs.sh script..."

# Test 1: Check if script file exists
echo "Test 1: Check if generate_docs.sh exists"
if [ -f "$PROJECT_ROOT/generate_docs.sh" ]; then
    echo "✓ PASS: generate_docs.sh exists"
else
    echo "✗ FAIL: generate_docs.sh not found"
    exit 1
fi

# Test 2: Check if script is executable
echo "Test 2: Check if generate_docs.sh is executable"
if [ -x "$PROJECT_ROOT/generate_docs.sh" ]; then
    echo "✓ PASS: generate_docs.sh is executable"
else
    echo "⚠ WARNING: generate_docs.sh is not executable, making it executable"
    chmod +x "$PROJECT_ROOT/generate_docs.sh"
fi

# Test 3: Check if VERSION file exists
echo "Test 3: Check if VERSION file exists"
if [ -f "$PROJECT_ROOT/VERSION" ]; then
    echo "✓ PASS: VERSION file exists"
else
    echo "✗ FAIL: VERSION file not found"
    exit 1
fi

# Test 4: Check if VERSION file is readable
echo "Test 4: Check if VERSION file is readable"
if [ -r "$PROJECT_ROOT/VERSION" ]; then
    VERSION=$(cat "$PROJECT_ROOT/VERSION")
    echo "✓ PASS: VERSION file is readable (version: $VERSION)"
else
    echo "✗ FAIL: VERSION file is not readable"
    exit 1
fi

# Test 5: Check if required directories exist or can be created
echo "Test 5: Check if required directories exist"
GENERATED_DIR="$PROJECT_ROOT/static/generated"
PLANTUML_DIR="$PROJECT_ROOT/static/img/plantuml"

if [ -d "$GENERATED_DIR" ] || mkdir -p "$GENERATED_DIR" 2>/dev/null; then
    echo "✓ PASS: generated directory exists or can be created"
else
    echo "✗ FAIL: Cannot create generated directory"
    exit 1
fi

if [ -d "$PLANTUML_DIR" ] || mkdir -p "$PLANTUML_DIR" 2>/dev/null; then
    echo "✓ PASS: plantuml directory exists or can be created"
else
    echo "✗ FAIL: Cannot create plantuml directory"
    exit 1
fi

# Test 6: Check if required commands are available
echo "Test 6: Check if required commands are available"

commands=("curl" "unzip" "java" "npx")
all_commands_available=true

for cmd in "${commands[@]}"; do
    if command -v "$cmd" &> /dev/null; then
        echo "  ✓ $cmd is available"
    else
        echo "  ✗ $cmd is NOT available"
        all_commands_available=false
    fi
done

if [ "$all_commands_available" = true ]; then
    echo "✓ PASS: All required commands are available"
else
    echo "⚠ WARNING: Some commands are missing (script may fail during execution)"
fi

# Test 7: Validate script syntax
echo "Test 7: Validate bash script syntax"
if bash -n "$PROJECT_ROOT/generate_docs.sh" 2>/dev/null; then
    echo "✓ PASS: Script has valid bash syntax"
else
    echo "✗ FAIL: Script has syntax errors"
    exit 1
fi

# Test 8: Check if script contains expected variables
echo "Test 8: Check if script contains expected variables"
if grep -q "BRANCH=" "$PROJECT_ROOT/generate_docs.sh" && \
   grep -q "GENERATED_DIRECTORY=" "$PROJECT_ROOT/generate_docs.sh" && \
   grep -q "PLANTUML_DIRECTORY=" "$PROJECT_ROOT/generate_docs.sh"; then
    echo "✓ PASS: Script contains expected variables"
else
    echo "✗ FAIL: Script is missing expected variables"
    exit 1
fi

echo ""
echo "====================================="
echo "All tests passed successfully!"
echo "====================================="
