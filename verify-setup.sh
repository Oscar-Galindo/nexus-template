#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   ${GREEN}🔍 NEXUS STARTER - SETUP VERIFICATION${CYAN}                      ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

errors=0
warnings=0

# Check if .env exists
echo -e "${BLUE}Checking .env file...${NC}"
if [ -f .env ]; then
    echo -e "${GREEN}✅ .env file exists${NC}"
else
    echo -e "${RED}❌ .env file not found${NC}"
    echo -e "${YELLOW}   Run: ./setup.sh${NC}"
    errors=$((errors + 1))
fi

# Check node_modules
echo ""
echo -e "${BLUE}Checking dependencies...${NC}"
if [ -d node_modules ]; then
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  Dependencies not installed${NC}"
    echo -e "${YELLOW}   Run: npm install${NC}"
    warnings=$((warnings + 1))
fi

# Load .env if it exists
if [ -f .env ]; then
    source .env 2>/dev/null
    
    echo ""
    echo -e "${BLUE}Checking required variables...${NC}"
    
    # Check SITE_NAME
    if [ -n "$SITE_NAME" ]; then
        echo -e "${GREEN}✅ SITE_NAME set${NC}"
    else
        echo -e "${YELLOW}⚠️  SITE_NAME not set${NC}"
        warnings=$((warnings + 1))
    fi
    
    # Check SITE_TYPE
    if [ "$SITE_TYPE" = "business" ] || [ "$SITE_TYPE" = "church" ]; then
        echo -e "${GREEN}✅ SITE_TYPE set to: $SITE_TYPE${NC}"
    else
        echo -e "${RED}❌ SITE_TYPE not valid (must be 'business' or 'church')${NC}"
        errors=$((errors + 1))
    fi
    
    # Check CMS_PROVIDER
    if [ "$CMS_PROVIDER" = "contentful" ] || [ "$CMS_PROVIDER" = "sanity" ] || [ "$CMS_PROVIDER" = "markdown" ]; then
        echo -e "${GREEN}✅ CMS_PROVIDER set to: $CMS_PROVIDER${NC}"
        
        # Check CMS-specific vars
        if [ "$CMS_PROVIDER" = "contentful" ]; then
            if [ -z "$CONTENTFUL_SPACE_ID" ] || [ -z "$CONTENTFUL_ACCESS_TOKEN" ]; then
                echo -e "${YELLOW}⚠️  Contentful API keys not configured${NC}"
                echo -e "${YELLOW}   Add: CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN${NC}"
                warnings=$((warnings + 1))
            fi
        elif [ "$CMS_PROVIDER" = "sanity" ]; then
            if [ -z "$SANITY_PROJECT_ID" ]; then
                echo -e "${YELLOW}⚠️  Sanity project ID not configured${NC}"
                echo -e "${YELLOW}   Add: SANITY_PROJECT_ID${NC}"
                warnings=$((warnings + 1))
            fi
        fi
    else
        echo -e "${RED}❌ CMS_PROVIDER not valid${NC}"
        errors=$((errors + 1))
    fi
    
    # Check FORM_PROVIDER
    if [ "$FORM_PROVIDER" = "ghl" ] || [ "$FORM_PROVIDER" = "simple" ]; then
        echo -e "${GREEN}✅ FORM_PROVIDER set to: $FORM_PROVIDER${NC}"
        
        # Check form-specific vars
        if [ "$FORM_PROVIDER" = "ghl" ]; then
            if [ -z "$GHL_API_KEY" ] || [ -z "$GHL_LOCATION_ID" ]; then
                echo -e "${YELLOW}⚠️  GoHighLevel API keys not configured${NC}"
                echo -e "${YELLOW}   Add: GHL_API_KEY, GHL_LOCATION_ID${NC}"
                warnings=$((warnings + 1))
            fi
        elif [ "$FORM_PROVIDER" = "simple" ]; then
            if [ -z "$RESEND_API_KEY" ] || [ -z "$NOTIFY_EMAIL" ]; then
                echo -e "${YELLOW}⚠️  Resend API key or email not configured${NC}"
                echo -e "${YELLOW}   Add: RESEND_API_KEY, NOTIFY_EMAIL${NC}"
                warnings=$((warnings + 1))
            fi
        fi
    else
        echo -e "${RED}❌ FORM_PROVIDER not valid${NC}"
        errors=$((errors + 1))
    fi
    
    # Check i18n
    if [ "$I18N_ENABLED" = "true" ]; then
        echo -e "${GREEN}✅ i18n enabled with locales: $I18N_LOCALES${NC}"
    else
        echo -e "${BLUE}ℹ️  i18n disabled (English only)${NC}"
    fi
fi

# Check key files
echo ""
echo -e "${BLUE}Checking project structure...${NC}"

required_dirs=(
    "src/lib/cms"
    "src/lib/forms"
    "src/lib/config"
    "src/i18n"
    "src/content"
    "src/pages"
    "src/components"
)

for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✅ $dir${NC}"
    else
        echo -e "${RED}❌ $dir missing${NC}"
        errors=$((errors + 1))
    fi
done

# Summary
echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed!${NC}"
    echo ""
    echo -e "Your setup is complete. You can now run:"
    echo -e "${CYAN}npm run dev${NC}"
    echo ""
elif [ $errors -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Setup complete with $warnings warning(s)${NC}"
    echo ""
    echo -e "Your project will run, but you should configure the missing API keys."
    echo -e "Edit your .env file to add the missing values."
    echo ""
else
    echo -e "${RED}❌ Setup incomplete with $errors error(s) and $warnings warning(s)${NC}"
    echo ""
    echo -e "Please fix the errors above before running the project."
    echo ""
    if [ ! -f .env ]; then
        echo -e "Quick fix: Run ${CYAN}./setup.sh${NC} to generate your .env file"
    fi
    echo ""
fi

exit $errors
