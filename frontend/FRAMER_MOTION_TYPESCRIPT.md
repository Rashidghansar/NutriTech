# Framer Motion TypeScript Troubleshooting Guide

## Common Type Definition Errors

### 1. Motion Components Missing Props

#### Symptoms
- TypeScript errors on `motion` components
- Errors like "Property 'className' does not exist on type 'MotionProps'"
- Unable to use standard HTML attributes on motion components

#### Solution

1. **Create a Type Extension**
   Create a file `src/types/motion.d.ts`:
   ```typescript
   import { motion } from 'framer-motion';

   declare module 'framer-motion' {
     interface MotionProps {
       className?: string;
       onClick?: () => void;
       type?: string;
       role?: string;
       'aria-label'?: string;
       disabled?: boolean;
     }
   }
   ```

2. **Update tsconfig.json**
   Add the type definition to the `include` section:
   ```json
   {
     "include": [
       "src",
       "src/**/*.ts",
       "src/**/*.tsx",
       "src/types/**/*.d.ts"
     ]
   }
   ```

### 2. Recommended Practices

1. **Use Type Assertions Sparingly**
   Instead of using type assertions, prefer extending the type definitions.

2. **Consistent Prop Types**
   Ensure all motion components have consistent prop types.

### 3. Debugging Checklist

- [ ] Install latest Framer Motion version
- [ ] Create type extension file
- [ ] Update tsconfig.json
- [ ] Restart TypeScript server
- [ ] Clear build cache

## Example Fixes

### Before
```typescript
<motion.div 
  className="my-class"  // TypeScript error
  onClick={() => {}}    // TypeScript error
>
  Content
</motion.div>
```

### After
```typescript
<motion.div 
  className="my-class"  // Now works
  onClick={() => {}}    // Now works
>
  Content
</motion.div>
```

## When to Seek Further Help

- Persistent type errors
- Complex component interactions
- Unusual motion component behaviors

---

**Pro Tip**: Keep Framer Motion and TypeScript up to date to minimize configuration issues. 