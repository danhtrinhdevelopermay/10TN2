# Vietnamese Educational Seating Management System Design Guidelines

## Design Approach
**System-Based Approach**: Clean, utility-focused design system optimized for Vietnamese educational environments. Drawing inspiration from modern productivity tools like Notion and Linear, with emphasis on clear data display and efficient classroom management workflows.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 219 85% 45% (Professional blue)
- Secondary: 220 15% 95% (Light gray backgrounds)
- Text: 220 20% 15% (Dark charcoal)
- Success: 142 76% 36% (Green for confirmations)
- Danger: 0 84% 60% (Red for deletions)
- Card borders: 220 15% 85%

**Dark Mode:**
- Primary: 219 85% 55% (Brighter blue for contrast)
- Secondary: 220 15% 10% (Dark gray backgrounds)
- Text: 220 15% 90% (Light text)
- Card backgrounds: 220 15% 15%

### Typography
- **Primary Font**: Inter (Google Fonts) - optimized for Vietnamese diacritics
- **Headers**: 600 weight, text-lg to text-xl for group titles
- **Body**: 400 weight, text-base for student names
- **Labels**: 500 weight, text-sm for table numbers and roles

### Layout System
**Spacing Units**: Consistently use Tailwind units of 2, 4, 6, and 8
- Card padding: p-4, p-6 for comfortable content spacing
- Grid gaps: gap-4 between seating cards
- Section margins: mb-6, mt-8 between groups
- Button spacing: px-4 py-2 for consistent touch targets

### Component Library

**Seating Arrangement Cards:**
- **Expanded Width**: Minimum width of 200px (w-48) to accommodate full Vietnamese names
- **Height**: Fixed height of 120px (h-30) for consistent grid alignment
- **Content Layout**: Centered student name with table number positioned in top-right corner
- **Border Styling**: Rounded corners (rounded-lg) with subtle border
- **Hover States**: Gentle elevation and border color change
- **Empty State**: Subtle dashed border with "Chưa có học sinh" placeholder

**Navigation Tabs:**
- **Active Tab**: Solid background with primary color
- **Inactive Tabs**: Transparent background with hover states
- **Tab Labels**: "Học sinh" (Students) and "Lớp trưởng" (Class Monitor)
- **Tab Spacing**: Equal width distribution with consistent padding

**Group Headers:**
- **Group Title**: "Tổ 1", "Tổ 2" format with bold typography
- **Background**: Light secondary color for visual separation
- **Padding**: Generous p-4 for easy scanning

**Modal Components:**
- **Assignment Modal**: For assigning students to specific tables
- **Student Selection**: Dropdown or searchable list
- **Role Assignment**: Toggle between student and class monitor roles
- **Backdrop**: Semi-transparent overlay with backdrop blur

**Buttons:**
- **Primary Actions**: Solid blue for "Phân công" (Assign) buttons
- **Secondary Actions**: Outline style for "Chỉnh sửa" (Edit)
- **Role Buttons**: Special styling for "Lớp trưởng" designation
- **Mobile Optimized**: Touch-friendly sizing (min-h-10)

### Vietnamese Text Optimization
- **Diacritic Support**: Ensure proper rendering of Vietnamese characters
- **Text Overflow**: Implement text truncation with tooltip on hover for very long names
- **Line Height**: Appropriate line-height (leading-relaxed) for Vietnamese text readability
- **Font Weight**: Slightly heavier weights for better Vietnamese character clarity

### Responsive Grid System
- **Desktop**: 4-5 cards per row with flexible wrapping
- **Tablet**: 3-4 cards per row maintaining readability
- **Mobile**: 2 cards per row with adjusted spacing
- **Card Sizing**: Responsive width with minimum dimensions preserved

### Key UX Principles
- **Visual Hierarchy**: Clear distinction between groups, tables, and individual assignments
- **Touch Accessibility**: All interactive elements sized for mobile touch
- **Data Clarity**: Student names fully visible without truncation
- **Role Distinction**: Clear visual difference between regular students and class monitors
- **Quick Actions**: Easy assignment and reassignment of students to tables

### Icons
Use Heroicons (outline style) for:
- Users icon for student management
- Star icon for class monitor designation
- Plus icon for adding new assignments
- Pencil icon for editing arrangements

### Critical Functionality
- **Name Display**: Full Vietnamese names visible without truncation
- **Role Management**: Clear distinction and easy switching between student and class monitor roles
- **Grid Responsiveness**: Maintains usability across all device sizes
- **Touch Interactions**: Optimized for mobile classroom management

This design prioritizes Vietnamese language support, efficient classroom organization, and mobile accessibility while maintaining professional educational standards.